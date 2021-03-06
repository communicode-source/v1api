'use strict'

import ProjectHandler from './../../db/handler/project';
import Response from '../Response';
import jwt from './../jwt'

import ActivityFeedHandler from './../../db/handler/activity';
import UserHandler from './../../db/handler/user';
import ChargeHandler from './../../db/handler/charge';
import MatchHandler from './../../db/handler/match';
import {LoginDataPull} from './../../utils/validations';

import prices from './../../config/prices';
import sendEmail from './../../utils/email';

const stripe = require('stripe')('sk_test_v6YuHnfOi5QjZlIORYJDyUq6');
stripe.setApiVersion('2017-06-05');

class ProjectController extends Response {
  constructor() {
    super();
    this.payouts = [];
  }

  async findFinProject(req, res) {
      const dbHandler = new ProjectHandler();
      const id = req.body.id;

      let data, statusCode;

      try {
        const proj = await dbHandler.population({_id: req.body.projectId, potential: req.userToken._id, isCompleted: true}, {path: 'potential', select: '-password -providerid -provider'});
        if(proj.length !== 1) {
            throw new Error('No project');
        }
        data = proj[0];
        statusCode = this.statusCode['success'];
      } catch(err) {
        console.log(err);
        data ={err: true};
        statusCode = this.statusCode['success'];
      }

      return new Response(data, statusCode);
  }

  async findDevProjects(req, res) {
      const dbHandler = new ProjectHandler();
      let data;
      try {
          if(req.userToken.accontType === true) {
              throw new Error('You are not permitted to access this (developers only)');
          }
          const projects = await dbHandler.findDescending({potential: req.userToken._id});
          data = {err: false, msg: projects};
      }
      catch(e) {
          console.log(e);
          data = {err: true, msg: e.message};
      }
      return new Response(data, 200);
  }

  async index(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode;

    try {
      data = await dbHandler.population({}, {path: 'potential nonprofitId', select: '-password -providerid -provider'});
      data.msg = jwt.generate(req.userToken);
      statusCode = this.statusCode['success'];
    } catch(err) {
      console.log(err);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async feed(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode;

    try {
      data = await dbHandler.feed({potential: null}, {path: 'nonprofitId', select: '-password -providerid -provider -totalCost'});
      data.msg = jwt.generate(req.userToken);
      statusCode = this.statusCode['success'];
    } catch(err) {
      console.log(err);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async findProject(req, res) {
    const dbHandler = new ProjectHandler();
    const id = req.params.id;

    let data, statusCode;

    try {
      data = await dbHandler.findById(id);
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findById(id);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async findProjectByNP(req, res) {
    const dbHandler = new ProjectHandler();
    const id = req.params.id;

    let data, statusCode;

    try {
      const projects = await dbHandler.population({nonprofitId: id}, {path: 'potential', select: '-password -providerid -provider'});
      data = {err: false, msg: projects};
      statusCode = this.statusCode['success'];
    } catch(err) {
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async createProject(req, res) {
    const dbHandler = new ProjectHandler();

    let data, statusCode, pipe, project;

    try {
      if(req.userToken.accountType !== true) {
          throw new Error('incorrect user type');
      }
      project = await dbHandler.create({nonprofitId: req.body.sanitized._id, item: req.body.sanitized.item});

      data = jwt.generate(req.userToken);
      data._id = project._id;

      statusCode = this.statusCode['success'];

    } catch(err) {
      console.log(err);
      data = { msg: 'Something went wrong' };
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async complete(req, res) {
      const dbHandler = new ProjectHandler();
      let data, statusCode = 200;
      try {
          let proj = await dbHandler.find({_id: req.body.id, nonprofitId: req.userToken._id, isCompleted: false});
          if(proj.length !== 1) {
              throw new Error('Invalid number of projects');
          }
          proj = proj[0];
          proj.isCompleted = true;
          await proj.save();
          data = {err: false, msg: 'Completed'};
      } catch(e) {
          console.log(e);
          data = {err: true, msg: 'Error error'};
      }
      return new Response(data, statusCode);
  }

  async updateProject(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, project;

    try {
      if(req.userToken.accountType !== true) {
          throw new Error('incorrect user type');
      }
      const ensureDraft = await dbHandler.find({_id: req.params.id, isDraft: true, nonprofitId: req.userToken._id, paid: false});
      if(ensureDraft.length !== 1) {
          throw new Error('Not valid number of projects');
      }
      delete req.body.project.paid;
      delete req.body.project._id;
      delete req.body.project.nonprofitId;
      delete req.body.project.totalCost;
      delete req.body.project.developerCost;
      delete req.body.project.matched;
      delete req.body.project.isCompleted;
      delete req.body.project.potential;

      project = await dbHandler.updateById(req.params.id, {...req.body.project});

      data = jwt.generate(req.userToken);

      statusCode = this.statusCode['success'];
    } catch(err) {
      console.log(err);
      data = { msg: 'Something went wrong' };
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async deleteNonProfitFromProject(req, res) {
      const dbHandler = new ProjectHandler();
      const chargeHandle = new ChargeHandler();
      let data, statusCode = 200;
      try {
          let proj = await dbHandler.find({_id: req.body.id, nonprofitId: req.userToken._id, matched: false});
          let charge = await chargeHandle.find({nonprofitId: req.userToken._id, projectId: req.body.id});
          if(proj.length !== 1) {
              throw new Error('Invalid number of projects');
          }
          if(charge.length === 1) {
              await stripe.refunds.create({
                  charge: charge[0].chargeId,
                  amount: Math.ceil(+charge[0].cost * .901)
              })
          }
          proj = proj[0];
          proj.isActive = false;
          proj.nonprofitId = null;
          await proj.remove();
          data = {err: false, msg: 'Completed'};
      } catch(e) {
          console.log(e);
          data = {err: true, msg: 'Error error'};
      }
      return new Response(data, statusCode);
  }

  async charge(req, res) {
    const dbHandler = new ProjectHandler();
    const user = new UserHandler();
    const chargeHandle = new ChargeHandler();
    let data, statusCode, project;

    try {

      const customerInfo = await user.isUserCustomer(req.userToken._id);
      let dbProject = await dbHandler.find({_id: req.body.projectId, nonprofitId: req.userToken._id});
      dbProject = dbProject[0];
      let price = (prices[dbProject.type] / 0.901).toFixed(2);

      if(!price) {
        throw new Error("No Price Associated");
      }

      if(!customerInfo.customer.isCustomer) {
        const customer = await stripe.customers.create({
          email: req.body.email,
          source: req.body.stripeToken.id
        });

        const charge = await stripe.charges.create({
            amount: Math.floor((price * 100)),
            currency: "USD",
            customer: customer.id
        });
        if(charge.paid) {
          data = jwt.generate(LoginDataPull(await user.find({_id: req.body.id.sanitize()})));
          const chargeId = await chargeHandle.add({cost: Math.floor((price * 100)), chargeId: charge.id, nonprofitId: req.userToken._id, nonprofitStripeAccount: customer.id, projectId: req.body.projectId});
          const project = await dbHandler.updateByIds(req.body.projectId.sanitize(), req.userToken._id, { isActive: true, isDraft: false, totalCost: chargeId._id });
          const newCustomer = await user.updateUserIsCustomer(req.userToken._id.sanitize(), customer.id);
          if(newCustomer) {
            statusCode = 200;
          } else {
            statusCode = 500;
            throw new Error("Could not update User Customer account.");
          }

        } else {
          throw new Error('Charge couldn\'t go through.');
        }

      } else {
        const charge = await stripe.charges.create({
            amount: Math.floor((price * 100)),
            currency: "USD",
            customer: customerInfo.customer.customerId
        });
        const chargeId = await chargeHandle.add({cost: Math.floor((price * 100)), chargeId: charge.id, nonprofitId: req.userToken._id, nonprofitStripeAccount: customerInfo.customer.customerId, projectId: req.body.projectId});
        if(charge.paid) {
          const project = await dbHandler.updateById(req.body.projectId.sanitize(), { isActive: true, isDraft: false, totalCost: chargeId._id });
          data = jwt.generate(LoginDataPull(await user.find({_id: req.body.id.sanitize()})));
          if(data) {
            statusCode = 200;
          } else {
            statusCode = 500;
            throw new Error("Could not update User Customer account.");
          }
        } else {
          throw new Error('Charge couldn\'t go through.');
        }
      }

    } catch(err) {
      data = jwt.generate(LoginDataPull(await user.find({_id: req.body.id.sanitize()})));
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async bookmark(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, pipe, nonprofit;

    try {
      data = await dbHandler.bookmark(req.body.user, req.body.project);
      nonprofit = await dbHandler.getNonprofitFromProject(req.body.project);

      if(nonprofit.nonprofitId) {

        pipe = await activity.addActivity({
          actor: req.body.user,
          verb: 'bookmarked',
          object: req.body.project,
        });

        pipe.handle({
          nonprofitId: nonprofit.nonprofitId
        }).through({
            createConnection: async (request) => {
              await request.graphSearchHandler.create(request.activity.actor, request.nonprofitId, .05, false);
            },
            addToFeed: (request) => {
              request.addToFeed(request.activity, request.graphSearchHandler);
            }
        }).dispatch(['createConnection', 'addToFeed']);
      }

      statusCode = this.statusCode['success'];

    } catch(err) {
      console.log(err);
      data = { msg: 'Something went wrong' };
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  // req.body.id = id of project,
  // user must be signed in and a developerId
  async matchDev(req, res) {
    const dbHandler = new ProjectHandler();
    const matchHandle = new MatchHandler();
    let data, statusCode = 200;
    try {
      if(req.userToken.accountType !== false) {
          throw new Error('incorrect user type');
      }

      const project = await dbHandler.find({_id: req.body.id, isActive: true, isDraft: false, matched: false});

      if(project.length !== 1) {
          throw new Error('incorrect number of projects');
      }

      const alMatched = await matchHandle.find({projectId: project[0]._id});
      if(alMatched.length !== 0) {
          throw new Error('incorrect number of matches');
      }

      const newMatch = await matchHandle.add({developerId: req.userToken._id, nonprofitId: project[0].nonprofitId, projectId: project[0]._id});
      const fullMatch = await matchHandle.findById(newMatch._id);

      const savedMatch = await matchHandle.saveMatch(project[0], req.userToken._id);
      /*project[0].matched = true;
      project[0].potential = req.userToken._id;
      project[0].save();*/

      data = { err: false, msg: 'Success!' };

      process.nextTick(async () => {
        const sendMail = await sendEmail(fullMatch[0].nonprofitId.email, {
          from:"contact@communicode.co",
          subject: "We found a match",
          templateId: "782e1083-75d5-4228-b0db-c014f6651442"
        }, {
          '-nonprofit_name-': fullMatch[0].nonprofitId.organizationname,
          '-developer_name-': fullMatch[0].developerId.fname + ' ' + fullMatch[0].developerId.lname,
          '-profile_url-': fullMatch[0].developerId.url,
          '-project_name-': fullMatch[0].projectId.title,
          '-nonprofit_profile_url-': fullMatch[0].nonprofitId.url
        });
      });
    }
    catch(e) {
        console.log(e);
        data = {err: true, msg: e.message};
    }
    return new Response(data, statusCode);
  }

  async deposit(req, res) {
    const dbHandler = new ProjectHandler();
    const user = new UserHandler();
    let data, statusCode;

    try {
      const token_id = request.body.stripeToken; // Using Express
      const developer = await user.find({_id: req.body.id.sanitize()});
      const project = await user.findById(req.body.projectId.sanitize());

      // Create a Recipient
      const recipient = await stripe.recipients.create({
        name: developer.fname + " " + developer.lname,
        type: "individual",
        card: token_id,
        email: developer.email
      });

      if(recipient.id) {
        const payout = await stripe.payouts.create({
          amount: (+req.body.price * 100), // amount in cents
          currency: "usd",
          recipient: recipient.id,
          card: recipient.cardId,
          statement_descriptor: "Communicode Project: " + project.title
        });
        if(!payout) {
          throw new Error('Could not create payout');
        }

        data = jwt.generate(LoginDataPull(await user.find({_id: req.body.id.sanitize()})));

      } else {
        throw new Error('Could not create recipient');
      }

    } catch(e) {
      console.log(e);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async updateVolunteerActive(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, project;
    try {
      project = await dbHandler.find({_id: req.body.projectId.projectId, nonprofitId: req.userToken._id, isActive: false, isDraft: true});
      if(project.length !== 1) {
          throw new Error('incorrect number of projects');
      }
      project[0].isActive = true;
      project[0].isDraft = false;
      await project[0].save();

      data = {err: false, msg: 'Success'};

      statusCode = this.statusCode['success'];
    } catch(err) {
      console.log(err);
      data = {err: true, msg: 'Something went wrong' };
      statusCode = this.statusCode['error'];
    }

    return new Response(data, statusCode);
  }

  async npDecision(req, res) {
      const decision = req.body.decision;
      const id = req.body.id;
      const dbHandler = new ProjectHandler();
      const matchHandle = new MatchHandler();
      let data, statusCode = 200;
      try {
        const matches = await matchHandle.find({projectId: id, nonprofitId: req.userToken._id});
        const project = await dbHandler.find({_id: id, nonprofitId: req.userToken._id, confirmed: false});
        if(matches.length !== 1 || project.length !== 1) {
            throw new Error('Improper number of matches or projects made');
        }

        if(decision === true) {
            console.log('Decision was true!');
            matches[0].isMatched = true;
            project[0].matched = false;
            project[0].confirmed = true;
            await project[0].save();

            const newMatch = await matches[0].save();
            const fullMatch = await matchHandle.findById(newMatch._id);

            process.nextTick( async () => {
              console.log("I am, in fact, being run.");
              const sendMail = await sendEmail(fullMatch[0].developerId.email, {
                from:"contact@communicode.co",
                subject: "Congratulations! You've got a match!",
                templateId: "fe39c1b5-40d3-40ea-a9dc-3f181f0b8a92"
              }, {
                '-nonprofit_name-': fullMatch[0].nonprofitId.organizationname,
                '-developer_name-': fullMatch[0].developerId.fname + ' ' + fullMatch[0].developerId.lname,
                '-project_name-': fullMatch[0].projectId.title,
                '-nonprofit_email-': fullMatch[0].nonprofitId.email
              });
            });
        }
        else {
            matches[0].remove();
            project[0].potential = null;
            project[0].matched = false;
            await project[0].save();
        }
        data = {err: false, msg: 'Succeeded to make decision'};

      } catch(err) {
        data = { err: true, msg: 'Something went wrong' };
      }

      return new Response(data, statusCode);
  }

  async payDev(req, res) {
      if(this.payouts.indexOf(req.userToken._id) !== -1) {
          return new Response({err: true, msg: 'Already paying out'}, 200);
      }
      this.payouts.push(req.userToken._id);
      const dbHandler = new ProjectHandler();
      const chargeHandle = new ChargeHandler();
      const user = new UserHandler();
      let data, statusCode = 200;
      let customer;
      try {
          if(req.userToken.accountType !== false) {
              throw new Error('User not a dev');
          }
          let chargeOp = await chargeHandle.find({projectId: req.body.id, devId: null});
          let prevCharge = await chargeHandle.find({projectId: req.body.id, devId: req.userToken._id});
          let project = await dbHandler.find({_id: req.body.id, potential: req.userToken._id, isCompleted: true, paid: false});
          if(chargeOp.length !== 1 || project.length !== 1) {
              throw new Error(chargeOp.length + ' or ' + project.length + ' is not right');
          }
          if(prevCharge.length !== 0) {
            project[0].paid = true;
            await project[0].save();
            throw new Error('Already Paid');
          }
          project = project[0];
          let customerInfo = await user.addQuery({_id: req.userToken._id, 'customer.isCustomer': true}).readUsers();
          if(customerInfo.length !== 1) {
              throw new Error('Invalid quantity of users');
          }
          customerInfo = customerInfo[0];
          customer = {id: customerInfo.customer.customerId};
          chargeOp = chargeOp[0];
          if(!chargeOp.cost) {
              throw new Error('Volunteer project, not a paid project');
          }
          const priceToDev = Math.floor((+chargeOp.cost * .901));
          const priceToUs = Math.floor((+chargeOp.cost * .07) - 60); // our cut minus the 30 + 25 cents for transaction fees. (5 cent buffer)
          const payout = await stripe.transfers.create({
            amount: priceToDev,
            currency: 'usd',
            destination: customer.id,
          });
          project.paid = true;
          project = await project.save();
          data = await chargeHandle.insertD({devId: req.userToken._id, chargeId: payout.id, projectId: req.body.id, cost: priceToDev});
          // const ourPay = await stripe.payouts.create({
          //   amount: priceToUs,
          //   currency: "usd",
          // });

          data = {err: false, msg: 'You should receive payment soon!'};
      }
      catch(e) {
          console.log(e);
          data = {err: true, msg: 'Failed'};
      }
      const index = this.payouts.indexOf(req.userToken._id);
      this.payouts.splice(index, 0);
      return new Response(data, statusCode);
  }

}


export default new ProjectController();
