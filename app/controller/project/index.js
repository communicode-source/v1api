'use strict'

import ProjectHandler from './../../db/handler/project';
import Response from '../Response';
import jwt from './../jwt'

import ActivityFeedHandler from './../../db/handler/activity';
import UserHandler from './../../db/handler/user';
import {LoginDataPull} from './../../utils/validations'

var stripe = require('stripe')('sk_test_v6YuHnfOi5QjZlIORYJDyUq6');
stripe.setApiVersion('2017-06-05');

class ProjectController extends Response {

  async index(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, pipe;

    try {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findAll();
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
      data = {err: false, msg: await dbHandler.find({nonprofitId: id})};
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = {err: true, msg: JSON.stringify(err)};
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async createProject(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, pipe, project;

    try {
      project = await dbHandler.create({nonprofitId: req.body.sanitized._id, item: req.body.sanitized.item});

      pipe = await activity.addActivity({
        actor: project.nonprofitId,
        verb: 'created',
        object: project._id,
      });

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
          console.log(req.userToken);
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

  async charge(req, res) {
    const dbHandler = new ProjectHandler();
    const user = new UserHandler();

    let data, statusCode, project;

    try {

      const customerInfo = await user.isUserCustomer(req.body.id.sanitize());

      if(!customerInfo.customer.isCustomer) {
        const customer = await stripe.customers.create({
          email: req.body.email,
          source: req.body.stripeToken.id
        });

        const charge = await stripe.charges.create({
            amount: (+req.body.price * 100),
            currency: "USD",
            customer: customer.id
        });

        if(charge.paid) {
          data = jwt.generate(LoginDataPull(await user.find({_id: req.body.id.sanitize()})));

          const newCustomer = await user.updateUserIsCustomer(req.body.id.sanitize(), customer.id);

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
            amount: (+req.body.price * 100),
            currency: "USD",
            customer: customerInfo.customer.customerId
        });

        if(charge.paid) {
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
      console.log(err);
      data = { msg: 'Something went wrong'};
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

}


export default new ProjectController();
