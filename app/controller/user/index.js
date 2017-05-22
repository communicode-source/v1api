'use strict'

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

import jwt from './../jwt';
import Response from './../Response.js';
// Require the Handler for the user.
import UserHandler from './../../db/handler/user';
// Utilities for the logins and sign ups because they contain a lot of logic.
import {LoginDataPull, verifyLocalLoginUser, createLocalUser, uniqueUser} from './../../utils';


class UserController extends Response {

  /**
   * User Login - Logic for login routes.
   * @param req - Express Request object
   * @param res - Express Response object
  **/
  async loginUser(req, res) {
    if(req.body.sanitized.provider !== 'local')
      return new Response(101, this.statusCode['success']);

    const dbHandler = new UserHandler();
    let authenticate, SC, data;


    try {
      const isLocal = (req.body.sanitized.provider === 'local')
      const query = {provider: 'local', email: req.body.sanitized.email};

      const users = await dbHandler.addQuery(query).readUsers();

      authenticate = verifyLocalLoginUser(req, users, dbHandler);


      SC = this.statusCode[authenticate.status];
      data = (SC == 500) ? 101 : jwt.generate(LoginDataPull(authenticate.data));
      SC = 200;
    } catch(e) {
      console.log(e);
      SC = this.statusCode['success'];
      data = 101;
    }

    return new Response(data, SC);
  }


    /**
     * User Creation - Logic for login routes.
     * @param req - Express Request object
     * @param res - Express Response object
    **/
    async createUser(req, res) {
      const isLocal = (req.body.sanitized.provider === 'local');
      if(!isLocal) {
        return new Response(100, this.statusCode['success']);
      }

      const dbHandler = new UserHandler();

      let SC, data, newUser;

      try {
        newUser = createLocalUser(req.body.sanitized);
        const unique = await uniqueUser(req.body.sanitized, dbHandler);
        if(unique === false)
          return new Response(100, this.statusCode['success']);
      } catch(e) {
        console.log(e);
        SC = this.statusCode['success'];
        data = 100;
      }

      if(newUser === false) {
        return new Response(100, this.statusCode['success']);
      }


      try {
        if(isLocal)
          newUser.password = dbHandler.makePassword(newUser.password);

        newUser = await dbHandler.createUser(newUser);

        SC = this.statusCode['success'];
        data = jwt.generate(LoginDataPull(newUser));

      } catch(e) {
        console.log(e);
        SC = this.statusCode['error'];
        data = 100;
      }
      return new Response(data, SC);
    }

}


export let controller = new UserController();
