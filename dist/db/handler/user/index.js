'use strict';

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

// Include mongoose and the mongoose model of the user.

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./../../model/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// I don't know why this won't work globally.
_mongoose2.default.Promise = require('bluebird');

var UserHandler = function () {

  // This just instantiates some class variables.
  function UserHandler() {
    _classCallCheck(this, UserHandler);

    this.user = {};
    this.ready = false;
    this.query = {};
    this.modified = [];
    this.update = {};
    this.prepFail = null;
    this.model = _user2.default;
  }

  /**
  *  @param query, this is what you want to search for.
  *  @return Promise, mongoose promise that returns the data from the db.
  **/


  _createClass(UserHandler, [{
    key: 'find',
    value: function find(query) {
      return this.model.findOne(query).exec();
    }
  }, {
    key: 'search',
    value: function search(id) {
      var array = id.split('');
      id = array.join('.?'); // Add .? into string
      var reg = new RegExp('.*' + id + '.*', 'i'); // Create RegExp
      return this.model.find({ $or: [{ 'fname': reg }, { 'lname': reg }, { 'organizationname': reg }] }).exec(); // Search
    }
  }, {
    key: 'dSearch',
    value: function dSearch(id) {
      var array = id[0].split('');
      id[0] = array.join('.?'); // Add .? into first name
      array = id[1].split('');
      id[1] = array.join('.?'); // Add .? into second name
      var fReg = new RegExp('.*' + id[0] + '.*', 'i'); // Create first RegExp
      var lReg = new RegExp('.*' + id[1] + '.*', 'i'); // Create second RegExp
      return this.model.find({ $or: [{ $and: [{ 'fname': fReg }, { 'lname': lReg }] }, { 'organizationname': fReg }] }).exec();
    }

    /**
    *  @param data, this is what the user will be created with. It is optional so long as you have provided a this.user somewhere else.
    *  @return Mongoose Model of user, this is the user that you just saved.
    **/

  }, {
    key: 'createUser',
    value: function createUser(data) {
      return new _user2.default(data || this.user).save();
    }
    /**
    *  @param json, This is what you will eventually search for.
    *  @return this, this object so that you can chain the next call.
    **/

  }, {
    key: 'addQuery',
    value: function addQuery(json) {
      this.query = json;
      return this;
    }
    /**
    *  @param id, this is the id of the user you want to update.
    *  @param things, these are the things you wish to have updated.
    *  @return Promise, mongoose promise that returns the status fromt he db.
    **/

  }, {
    key: 'updateUser',
    value: function updateUser(id, things) {
      return _user2.default.update({ _id: id || this.user._id }, { $set: things }).exec();
    }
    /**
    *  WARNING There is no safety in place here to ensure that everything goes as it should.
    *  @param query, everything that goes into the update function.
    *  @return I don't think this actually returns anything.
    **/

  }, {
    key: 'strictUpdate',
    value: function strictUpdate(query) {
      return _user2.default.update(query);
    }

    /**
    *  This returns everything from the user db. Don't actually use this during production because we don't want to dump all users to random people.
    *  @return Promise, mongoose promise that returns the data from the db.
    **/

  }, {
    key: 'readAll',
    value: function readAll() {
      return _user2.default.find({}).exec();
    }
    /**
    *  Relies on you calling addQuery first! This is what will be searched for.
    *  @return Promise, mongoose promise that returns the data from the db.
    **/

  }, {
    key: 'readUsers',
    value: function readUsers() {
      return _user2.default.find(this.query).exec();
    }
  }, {
    key: 'setPassword',
    value: function setPassword(pw) {
      var user = new _user2.default();
      this.user.password = user.generateHash(pw);
      return this.user.password;
    }
    /**
    *  @param pw, This is the password to be encrypted.
    *  @return The encrypted password for insertion to the db.
    **/

  }, {
    key: 'makePassword',
    value: function makePassword(pw) {
      return new _user2.default().generateHash(pw);
    }
    /**
    *  @param pw, the password the user typed in.
    *  @param userModel, this is hte mongodb object that has the user from the db.
    *  @return Boolean, whether or not the passwords match.
    **/

  }, {
    key: 'checkPassword',
    value: function checkPassword(user, userModel) {
      return userModel.validPassword(user.password);
    }
    /**
    *  This function resets the class for use with another user/query without have to do it manually or creating another handler instance.
    *  @param extent, true/false. Whether or not to clear this.user
    *  @return this, for use when chaining.
    **/

  }, {
    key: 'cleanup',
    value: function cleanup(extent) {
      this.ready = false;
      this.query = {};
      this.modified = [];
      this.update = {};
      this.prepFail = null;
      if (extent) this.user = {};
      return this;
    }
  }]);

  return UserHandler;
}();

module.exports = UserHandler;
//# sourceMappingURL=index.js.map