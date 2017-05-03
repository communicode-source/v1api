'use strict'

const TestDBHandler = require('./../../db/handler/test');

class TestController {

  *index(req, res) {
    let dbHandler = new TestDBHandler();
    yield *dbHandler.findAll();
  }

}

module.exports = new TestController();
