'use strict'

/**
 * @name TestController
 * @author Trevor Crupi
 * Created at: 5/3/2017
 * A controller to handle logic for the test routes.
**/

// Require DB Handler
import TestDBHandler from './../../db/handler/test';
import Response from '../Response';

class TestController extends Response {

  /**
   * Index Test Controller - Logic for /test route
   * @param req - Express Request object
   * @param res - Express Response object
  **/
  async index(req, res) {
    const dbHandler = new TestDBHandler();

    let data, statusCode;

    try {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

}

module.exports = new TestController();
