const database = require('./../../config/database.js');
const mongoose = require('mongoose');
module.exports = () => {
  mongoose.Promise = mongoose.Promise = require('bluebird');
  mongoose.connect(database.url);

  mongoose.connection.on('error', function() {
    console.info("Could not run mongodb, did you forget to run mongod?");
  });
}
