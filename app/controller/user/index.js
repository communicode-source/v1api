'use strict'

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

import jwt from './../jwt'
import Response from './../Response.js'
// Require the Handler for the user.
import UserHandler from './../../db/handler/user'
// Utilities for the logins and sign ups because they contain a lot of logic.
import {LoginDataPull, verifyExternalLoginUser, isLocalUser, createLocalUser, createExternalUser, uniqueUser, ensureOnlyOne} from './../../utils/validations'
import ActivityFeedHandler from './../../db/handler/activity';
import mongoose from 'mongoose';

import uuidV4 from 'uuid/v4';
import storage from '@google-cloud/storage';
import fs from 'fs';

class UserController extends Response {

  async getUserProfile(req, res) {
    const url = req.params.url;
    const dbHandler = new UserHandler();

    let statusCode, data;

    try {
      data = await dbHandler.getProfileByUrl(url);
      statusCode = this.statusCode['success'];
    } catch(e) {
      data = await dbHandler.getProfileByUrl(url);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async loginUser(req, res) {
    // Declarations of constants
    const contents = req.body.sanitized
    const dbHandler = new UserHandler()
    const isLocal = (req.body.sanitized.provider === 'local')
    // Declarations of  variables
    let status, data, newUser

    try {
      let user = contents

      // Gets the user from the database and does checking to ensure passwords match, etc.
      user = (isLocal) ? await isLocalUser(user, dbHandler) : await uniqueUser(await createExternalUser(contents), dbHandler, 1)

      // Create the status code and the user JWT as data.
      status = this.statusCode['success']
      data = jwt.generate(LoginDataPull(user))

    } catch(e) {
      console.log(e)
      status = this.statusCode['success']
      data = 100
    }

    return new Response(data, status)
  }


    async createUser(req, res) {
      // Declarations of constants
      const contents = req.body.sanitized
      const dbHandler = new UserHandler()
      const activity = new ActivityFeedHandler()
      const isLocal = (req.body.sanitized.provider === 'local')
      // Declarations of  variables
      let status, data, newUser, pipe


      try {
        // Getting the user Json from the req.
        newUser = (isLocal) ? createLocalUser(contents, dbHandler) : await createExternalUser(contents)
        // Checks to ensure the new user is in fact unique.
        const unique = await uniqueUser(newUser, dbHandler)

        // Creating the new user in the DB and returning it.
        newUser = await dbHandler.createUser(newUser)

        // Create the status code and the user JWT as data.
        status = this.statusCode['success']
        data = jwt.generate(LoginDataPull(newUser))

        pipe = await activity.addActivity({
          actor: newUser._id,
          verb: 'created',
          object: newUser._id,
        });

        pipe.through({
            createConnection: async (request) => {
              await request.graphSearchHandler.create(request.activity.actor, request.activity.object, 1.00, true);
            },
            addToFeed: (request) => {
              request.addToFeed(request.activity, request.graphSearchHandler);
            }
        }).dispatch(['createConnection', 'addToFeed']);

      } catch(e) {
        console.log(e)
        status = this.statusCode['success']
        data = 100
      }

      return new Response(data, status)
    }

    async updateFirstAndLastName(req, res) {
      const dbHandler = new UserHandler();

      const fname = req.body.sanitized.fname;
      const lname = req.body.sanitized.lname;
      const organizationname = req.body.sanitized.organizationname;
      let modified, numberOfSimilarUsers, data, statusCode, profileURL;

      try {
          // Find # of users to tell how to construct the profile url
          // numberOfSimilarUsers = await dbHandler.findAllUsersWithFirstAndLast(fname, lname);

          // profileURL = this.createProfileURL(numberOfSimilarUsers, fname, lname, organizationname, req.body.user.profile._id);
          profileURL = req.userToken._id;
          modified = await dbHandler.updateUser(req.body.user.profile._id, { fname: fname, lname: lname, organizationname: organizationname, url: profileURL });

          data = {
            ...req.body.user.profile,
            fname: fname,
            lname: lname,
            organizationname: organizationname,
            url: profileURL
          };

          if(modified) {
            data = jwt.generate(LoginDataPull(await dbHandler.find({_id: req.userToken._id})));
            statusCode = this.statusCode['success'];
          } else {
            throw new Error('Not modified');
          }

      } catch(e) {
          console.log(e);
          data = 100;
          statusCode = this.statusCode['error'];
      }

      return new Response(data, statusCode);
    }

    async updateInterests(req, res) {
      const dbHandler = new UserHandler(req, res);
      const interests = req.body.sanitized.interests.split(',');
      let modified, data, statusCode;

      data = {
        ...req.body.user,
        interests: interests
      };

      try {
        modified = await dbHandler.updateUser(req.params.id, { interests });

        if (modified) {
          data = jwt.generate(LoginDataPull(await dbHandler.find({_id: req.userToken._id})));
          statusCode = this.statusCode['success'];
        } else {
          throw new Error('Could not update interests');
        }

      } catch(e) {
        console.log(e);
        data = 100;
        statusCode = this.statusCode['error'];
      }

      return new Response(data, statusCode);
    }

    createProfileURL(numberOfSimilarUsers, fname, lname, organizationname, id) {
        let profileURL;

        if(!organizationname) {
          if(numberOfSimilarUsers == 0) {
            return (fname + lname).toLowerCase();
          }

          if(numberOfSimilarUsers == 1) {
            return (fname + "-" + lname).toLowerCase();
          }

          if(numberOfSimilarUsers == 2) {
            return (lname + fname).toLowerCase();
          }

          if(numberOfSimilarUsers == 3) {
            return (lname + "-" + fname).toLowerCase();
          }

          return id;
        }

        return organizationname.replace(/\s/g, '').toLowerCase();
    }

    async updateUser(req, res) {
        const userID = req.userToken._id;
        const dbHandler = new UserHandler();
        const fields = {...req.body.settings};
        let data;
        for(const i in fields) {
            if(fields[i] === null || fields[i] === null || fields[i] === undefined) {
              delete fields[i];
              continue;
            }
            if(typeof fields[i] !== 'String' || typeof fields[i] !== 'string') {
                continue;
            }
            fields[i] = fields[i].sanitize();
        }
        delete fields.password;
        delete fields._id;
        if(fields.city && fields.country) {
            fields.location = [fields.city, fields.country];
        }
        try {
            if(fields.url && fields.url !== req.userToken.url) {
                const check = await dbHandler.addQuery({url: fields.url}).readUsers();
                if(check.length !== 0) {
                    throw new Error('Already taken');
                }
            }
            const u = await dbHandler.updateUser(userID, fields);
            data = jwt.generate(LoginDataPull(await dbHandler.find({_id: userID})));
        }
        catch(e) {
            console.log(e);
            data = {err: true, msg: JSON.stringify(e)};
        }
        return new Response(data, 200);
    }

    async uploadAvatar(req, res) {
      const dbHandler = new UserHandler();
      const gcs = storage({
        projectId: 'communicode-167922',
        keyFilename: 'app/config/communicode-cb711c407a01.json'
      });
      const bucket = gcs.bucket('user-profile-avatars');

      let avatar = req.files.avatar;
      let ext = req.files.avatar.name.split('.').pop();
      let data;

      const uuid = uuidV4();
      try {
          const user = await dbHandler.updateById(req.body.id, { image: { avatar: uuid + "." + ext } });
          data = jwt.generate(LoginDataPull(await dbHandler.find({_id: req.body.id})));
      } catch(e) {
          console.log(e);
          res.send(500).end();
      }

      avatar.mv('uploads/' + uuid + "." + ext, (err) => {
        bucket.upload('uploads/' + uuid + "." + ext, function(err, file) {
          if (!err) {
            fs.unlinkSync('uploads/' + uuid + "." + ext);
            res.json(data);
          } else {
            console.log(err);
            res.send(500).end();
          }
        });
      });
    }
}

export let controller = new UserController()
