'use strict'

/**
 * @name TestController
 * @author Trevor Crupi
 * Created at: 5/3/2017
 * A controller to handle logic for the test routes.
**/

// Require DB Handler
const TestDBHandler = require('./../../db/handler/test');

class TestController {

  /**
   * Index Test Controller - Logic for /test route
   * @param req - Express Request object
   * @param res - Express Response object
  **/
  *index(req, res) {
    const testHandler = new TestDBHandler();
    yield *testHandler.findAll();
  }

}

module.exports = new TestController();
