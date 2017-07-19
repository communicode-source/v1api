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
          numberOfSimilarUsers = await dbHandler.findAllUsersWithFirstAndLast(fname, lname);

          profileURL = this.createProfileURL(numberOfSimilarUsers, fname, lname, organizationname, req.body.user.profile._id);

          modified = await dbHandler.updateUser(req.body.user.profile._id, { fname: fname, lname: lname, organizationname: organizationname, url: profileURL });

          data = {
            ...req.body.user.profile,
            fname: fname,
            lname: lname,
            organizationname: organizationname,
            url: profileURL
          };

          if(modified) {
            data = jwt.generate(data);
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
          data = jwt.generate(data);
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
}

export let controller = new UserController()
