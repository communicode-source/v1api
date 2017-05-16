'use strict'

/**
 * @name SecureController
 * @author Cooper Campbell
 * Created at: 5/15/2017
 * A controller to handle logic for the Secure routes.
**/

// Require DB Handler
import UserDBHandler from './../../db/handler/user';
import Response from '../Response';
import Utilities, { CRUDUserBootstrap } from './../../utils';


class SecureController extends Response {

  async meUpdate(req, res) {
    const dbHandler = new UserDBHandler();
    const verifyUser = Utilities.CRUDUserBootstrap;
    let data, statusCode, validToken;

    validToken = verifyUser.verify(req);

    data = verifyUser.formatUpdateData(req, true);

    data = await verifyUser.nameChangeProtection(validToken, data, dbHandler);
    try {
      data = dbHandler.updateUser(validToken._id, data);
      statusCode = this.statusCode['success'];
    } catch( err ) {
      data = {err: true, msg: 'Something went wrong when updating the user'};
      statusCode = this.statusCode['error'];
    }

    return new Response(data, statusCode);
  }


}
