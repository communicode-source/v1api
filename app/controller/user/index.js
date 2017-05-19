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

// Utilities for the logins and sign ups because they contain a lot of logic.
import {LoginDataPull}, {verifyLoginUser} from './../../utils';


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
      const query = (req.body.provider == 'local')
        ? {provider: 'local', email: req.body.email}
        : {providerid: req.body.providerid, provider: req.body.provider};


      const users = await dbHandler.addQuery(query).readUsers();

      authenticate = (req.body.provider == 'local')
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
}


export let controller = new UserController();
