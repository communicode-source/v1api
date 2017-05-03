'use strict';

const Test = require('./../../model/test');

class TestDBHandler {

  /**
   * This function finds all Test items in DB
  **/
  *findAll() {
    yield Test.find({}).exec();
  }

}

module.exports = TestDBHandler;
