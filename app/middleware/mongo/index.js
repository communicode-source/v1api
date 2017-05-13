import mongoose from 'mongoose';
import config from './../../config/database.js';
import bluebird from 'bluebird';

module.exports = () => {
  mongoose.Promise = bluebird;
  mongoose.connect(config.url);

  mongoose.connection.on('error', () => {
    console.info("Could not run mongodb, did you forget to run mongod?");
  });
}
