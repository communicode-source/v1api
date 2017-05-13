'use strict';

import Test from './../../model/test';

class TestDBHandler {

  /**
   * This function finds all Test items in DB
  **/
  findAll() {
    return Test.find().exec();
  }

}

export default TestDBHandler;
