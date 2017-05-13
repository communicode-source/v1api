'use strict'

/**
 * @name TestController
 * @author Trevor Crupi
 * Created at: 5/3/2017
 * A controller to handle logic for the test routes.
**/

// Require DB Handler
import TestDBHandler from './../../db/handler/test';

class TestController {

  /**
   * Index Test Controller - Logic for /test route
   * @param req - Express Request object
   * @param res - Express Response object
  **/
  async index(req, res) {
    const dbHandler = new TestDBHandler();

    let response, statusCode;

    try {
      response = await dbHandler.findAll();
      statusCode = 200;
    } catch(err) {
      response = await dbHandler.findAll();
      statusCode = 404;
    }

    return {
      data: response,
      status: statusCode
    };
  }

}

module.exports = new TestController();
