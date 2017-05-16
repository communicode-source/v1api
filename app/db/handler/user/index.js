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
