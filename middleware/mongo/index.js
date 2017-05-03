const database = require('./../../config/database.js');
const mongoose = require('mongoose');
module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(database.url);
  mongoose.connection.on('error', function() {
  console.info("Could not run mongodb, did you forget to run mongod?");
});
}
