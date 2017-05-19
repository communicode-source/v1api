'use strict'

const UserHandler  = require('./../../db/handler/user');
import Response from './../Response.js';
import {LoginDataPull}, {verifyLoginUser} from './../../utils';


class UserController extends Response {

  updateUser(who, changes) {
    const dbHandler = new UserHandler();
    // WILL DO STUFF LATER
  }

  async loginUser(req, res) {
    if(['facebook', 'google', 'local'].indexOf(req.body.provider) === -1)
      return new Response(this.statusCode['error'], 'Mutated data');

    const dbHandler = new UserHandler();
    let authenticate, SC, data;
    try {
      const users = await dbHandler.addQuery(
          (req.body.provider == 'local')
          ? {provider: 'local', email: req.body.email}
          : {providerid: req.body.providerid, provider: req.body.provider}
        ).readUsers();

      authenticate = (req.body.provider == 'local') ? verifyLocalLoginUser(req, users, dbHandler) : verifyExternalUser(users);
      SC = this.statusCode[authenticate.status];
      data = (SC == 'error') ? authenticate.data : LoginDataPull(authenticate.data);

    } catch(e) {
      console.log(e);
      SC = this.statusCode['error'];
      data = 'Something went wrong!';
    }

    return new Response(SC, data);

  }
}


export let controller = new UserController();
