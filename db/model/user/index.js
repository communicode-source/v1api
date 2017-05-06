const bcrypt   = require('bcrypt-nodejs');
const mongoose = require("mongoose");

let User = mongoose.Schema({
  email            : String,
  accounttype      : Boolean,
  provider         : String,
  providerid       : String,
  password         : String,
  fname            : String,
  lname            : String,
  organizationname : String,
  url              : String,
  urlnum           : Number,
  nonprofittype    : String,
  skills           : Object,
  interests        : Array,
});
User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
