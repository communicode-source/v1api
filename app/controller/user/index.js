'use strict'

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

// Require the Handler for the user.
import UserHandler from './../../db/handler/user';
import Response from './../Response.js';
import jwt from './../jwt';
// Utilities for the logins and sign ups because they contain a lot of logic.
import {LoginDataPull, verifyLoginUser, createLocalUser, createExternalUser, uniqueUser} from './../../utils';


class UserController extends Response {

  /**
   * User Login - Logic for login routes.
   * @param req - Express Request object
   * @param res - Express Response object
  **/
  async loginUser(req, res) {
    if(['facebook', 'google', 'local'].indexOf(req.body.provider) === -1)
      return new Response(this.statusCode['error'], 'Mutated data');

    const dbHandler = new UserHandler();
    let authenticate, SC, data;


    try {
      // this is an abnoxious ternary but it prevents two other if statements.
      const isLocal = (req.body.provider === 'local')
      const query = (isLocal)
        ? {provider: 'local', email: req.body.sanatized.email}
        : {providerid: req.body.sanatized.providerid, provider: req.body.sanatized.provider};


      const users = await dbHandler.addQuery(query).readUsers();

      authenticate = (isLocal)
        ? verifyLocalLoginUser(req, users, dbHandler)
        : verifyExternalUser(users);


      SC = this.statusCode[authenticate.status];
      data = (SC == 'error') ? authenticate.data : LoginDataPull(authenticate.data);

    } catch(e) {
      console.log(e);
      SC = this.statusCode['error'];
      data = 'Internal processing error.';
    }

    return new Response(SC, data);
  }


    /**
     * User Creation - Logic for login routes.
     * @param req - Express Request object
     * @param res - Express Response object
    **/
    async createUser(req, res) {
      const isLocal = (req.body.provider === 'local');


      const dbHandler = new UserHandler();

      let SC, data;


      let newUser = (isLocal) ? createLocalUser(req.body.sanatized) : createExternalUser(req.body.sanatized);


      if(await uniqueUser(req.body.sanatized, dbHandler) === false);
        return new Response(this.statusCode['error'], 'Not a new user');


      if(newUser === false) {
        return new Response(this.statusCode['error'], 'The required data was not passed through');
      }


      try {
        newUser.password = dbHandler.makePassword(newUser.password);

        newUser = await dbHandler.createUser(newUser);

        SC = this.statusCode['success'];
        data = jwt.generate(LoginDataPull(newUser));

      } catch(e) {
        console.log(e);
        SC = this.statusCode['error'];
        data = 'Something went wrong';
      }
      return new Response(SC, data);
    }

}


export let controller = new UserController();
