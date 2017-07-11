'use strict'

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

// Include mongoose and the mongoose model of the user.
import mongoose from 'mongoose';
import User from './../../model/user';

// I don't know why this won't work globally.
mongoose.Promise  = require('bluebird');


class UserHandler {

  // This just instantiates some class variables.
  constructor() {
    this.user             = {};
    this.ready            = false;
    this.query            = {};
    this.modified         = [];
    this.update           = {};
    this.prepFail         = null;
    this.model            = User;
  }

  /**
  *  @param query, this is what you want to search for.
  *  @return Promise, mongoose promise that returns the data from the db.
  **/
  find(query) {
    return this.model.findOne(query).exec();
  }

  search(id) {
  	let array = id.split('');
  	id = array.join('.?'); // Add .? into string
  	const reg = new RegExp('.*'  + id + '.*', 'i'); // Create RegExp
  	return this.model.find({$or:[ {'fname': reg}, {'lname': reg}, {'organizationname' : reg}]}).exec(); // Search
  }

  dSearch(id) {
  	let array = id[0].split('');
  	id[0] = array.join('.?'); // Add .? into first name
  	array = id[1].split('');
  	id[1] = array.join('.?'); // Add .? into second name
  	const fReg = new RegExp('.*' + id[0] + '.*', 'i'); // Create first RegExp
  	const lReg = new RegExp('.*' + id[1] + '.*', 'i'); // Create second RegExp
  	return this.model.find({$or: [{$and:[ {'fname': fReg}, {'lname': lReg}]}, {'organizationname': fReg}]}).exec();
  }

  /**
  *  @param data, this is what the user will be created with. It is optional so long as you have provided a this.user somewhere else.
  *  @return Mongoose Model of user, this is the user that you just saved.
  **/
  createUser(data) {
    return new User(data||this.user).save();
  }
  /**
  *  @param json, This is what you will eventually search for.
  *  @return this, this object so that you can chain the next call.
  **/
  addQuery(json) {
    this.query = json;
    return this;
  }
  /**
  *  @param id, this is the id of the user you want to update.
  *  @param things, these are the things you wish to have updated.
  *  @return Promise, mongoose promise that returns the status fromt he db.
  **/
  updateUser(id, things) {
    return User.update({_id: (id || this.user._id)}, { $set: things }, {"multi": true}).exec()
  }
  /**
  *  WARNING There is no safety in place here to ensure that everything goes as it should.
  *  @param query, everything that goes into the update function.
  *  @return I don't think this actually returns anything.
  **/
  strictUpdate(query) {
    return User.update(query);
  }

  /**
  *  This returns everything from the user db. Don't actually use this during production because we don't want to dump all users to random people.
  *  @return Promise, mongoose promise that returns the data from the db.
  **/
  readAll() {
    return User.find({}).exec();
  }
  /**
  *  Relies on you calling addQuery first! This is what will be searched for.
  *  @return Promise, mongoose promise that returns the data from the db.
  **/
  readUsers() {
    return User.find(this.query).exec();
  }

  setPassword(pw) {
    let user = new User();
      this.user.password = user.generateHash(pw);
      return this.user.password;
    }
  /**
  *  @param pw, This is the password to be encrypted.
  *  @return The encrypted password for insertion to the db.
  **/
  makePassword(pw) {
    return new User().generateHash(pw);
  }
  /**
  *  @param pw, the password the user typed in.
  *  @param userModel, this is hte mongodb object that has the user from the db.
  *  @return Boolean, whether or not the passwords match.
  **/
  checkPassword(user, userModel) {
    return userModel.validPassword(user.password)
  }

  findAllUsersWithFirstAndLast(fname, lname) {
    return User.count({fname: fname, lname: lname}).exec();
  }

  /**
  *  This function resets the class for use with another user/query without have to do it manually or creating another handler instance.
  *  @param extent, true/false. Whether or not to clear this.user
  *  @return this, for use when chaining.
  **/
  cleanup(extent) {
    this.ready = false;
    this.query            = {};
    this.modified         = [];
    this.update           = {};
    this.prepFail         = null;
    if(extent)
      this.user = {};
    return this;
  }

}
module.exports = UserHandler;
