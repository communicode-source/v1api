'use strict'

import mongoose from 'mongoose';
import User from './../../model/user';


mongoose.Promise  = require('bluebird');


class UserHandler {

  constructor() {
    this.user             = {};
    this.ready            = false;
    this.query            = {};
    this.modified         = [];
    this.update           = {};
    this.prepFail         = null;
    this.model            = User;
  }

  find(query) {
    return this.model.findOne(query).exec();
  }

  search(id) {
	let array = id.split('');
	id = array.join('.?'); // Add .? into string
	const reg = new RegExp('.*'  + id + '.*', 'i'); // Create RegExp
	return this.model.find({$or:[ {'fname': reg}, {'lname': reg}]}).exec(); // Search
  }

  dSearch(id) {
	let array = id[0].split('');
	id[0] = array.join('.?'); // Add .? into first name
	  console.log(id[0]);
	array = id[1].split('');
	id[1] = array.join('.?'); // Add .? into second name
	  console.log(id[1]);
	const fReg = new RegExp('.*' + id[0] + '.*', 'i'); // Create first RegExp
	const lReg = new RegExp('.*' + id[1] + '.*', 'i'); // Create second RegExp
	return this.model.find({$or:[ {'fname': fReg}, {'lname': lReg}]}).exec(); // Search
  }

  createUser(data) {
    return new User(data||this.user).save();
  }

  addQuery(json) {
    this.query = libs.lCaseIndex(json);
    return this;
  }

  updateUser(id, things) {
    return User.update({_id: (id || this.user._id)}, {$set: things}).exec()
  }

  strictUpdate(query) {
    return User.update(query);
  }


  readAll() {
    return User.find({}).exec();
  }

  readUsers() {
    return User.find(this.query).exec();
  }




  setPassword(pw) {
    let user = new User();
      this.user.password = user.generateHash(pw);
      return this.user.password;
  }

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
