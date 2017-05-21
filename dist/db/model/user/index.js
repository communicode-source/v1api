'use strict';

var bcrypt = require('bcrypt-nodejs');
var mongoose = require("mongoose");

var User = mongoose.Schema({
  accounttype: { type: Boolean, default: null },
  datejoined: { type: Date, default: Date.now },
  email: { type: String, required: true },
  fname: { type: String, default: null },
  interests: { type: Array, default: [] },
  lname: { type: String, default: null },
  nonprofittype: { type: String, default: null },
  organizationname: { type: String, default: null },
  password: { type: String, default: null },
  provider: { type: String, required: true },
  providerid: { type: String, default: null },
  skills: { type: Object, default: {} },
  url: { type: String, default: null },
  urlnum: { type: Number, default: null }
});
User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
//# sourceMappingURL=index.js.map