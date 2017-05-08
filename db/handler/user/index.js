'use strict'

const mongoose    = require('mongoose');
const libs        = require('./lib');
const User        = require('./../../model/user');
mongoose.Promise  = require('bluebird');


class UserHandler {

  constructor() {
    this.user             = {};
    this.ready            = false;
    this.fields           = ['_id',
                              'email',
                              'accounttype',
                              'provider',
                              'providerid',
                              'password',
                              'fname',
                              'lname',
                              'organizationname',
                              'url',
                              'urlnum',
                              'nonprofittype',
                              'skills',
                              'interests'];
    this.query            = {};
    this.modified         = [];
    this.update           = {};
    this.prepFail         = null;
  }

  find(query) {
    return User.findOne(query).exec();
  }

  createUser(data) {
    return new Promise((resolve, reject) => {
      this.user = libs.lCaseIndex(data);
      if(this.user.fname && this.user.lname) {
        const fname = this.user.fname.toLowerCase();
        const lname = this.user.lname.toLowerCase();
        libs.updateUrl(fname, lname)
        .then((results) => {
          const number = libs.getUrlNumber(results);
          this.user.url = fname+"."+lname+number.toString();
          this.user.urlnum = number;
          const newUser = new User(this.user);
          newUser.save();
          return resolve(newUser);
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
      } else {
        const newUser = new User(this.user);
        newUser.save();
        return resolve(newUser);
      }
    });
  }

  addQuery(json) {
    this.query = libs.lCaseIndex(json);
    return this;
  }

  prepUpdate(user, change) {
    if(user == null && this.user == null) {
      this.ready = false;
      this.prepFail = 'No user object defined';
      return this;
    }
    this.user = user;
    let hold = {};

    for(let i in change) {
      if(change[i] == this.user[i.toLowerCase()])
      {
        continue;
      }
      hold[i] = change[i];
    }

    this.update = libs.lCaseIndex(hold);


    if(Object.keys(this.update).length != 0) {
      this.ready = true;
      return this;
    }

    if(Object.keys(change).length == 0)
      this.prepFail = 'No update data given';
    else
      this.prepFail = 'Data was not new';
    return this;
  }

  *updateUser() {
    if(this.ready === false) {
      return {err: true, msg: (this.prepFail) ? this.prepFail : 'Run prepUpdate first'};
    }
    if(this.update.fname || this.update.lname) {
      yield new Promise((resolve, reject) => {
        const fname = (this.update.fname) ? this.update.fname.toLowerCase() : this.user.fname.toLowerCase();
        const lname = (this.update.lname) ? this.update.lname.toLowerCase() : this.user.lname.toLowerCase();
        const matches = libs.updateUrl(fname, lname);
        matches.then((results) => {
          const number = libs.getUrlNumber(results);
          this.update.url = fname+"."+lname+number.toString();
          this.update.urlnum = number;
          resolve();
        });
      });
    }

    return {exec: User.update({_id: this.user._id}, {$set: this.update}).exec(), cleanup: this.cleanup};
  }


  readAll() {
    return User.find({}).exec();
  }

  *readUsers() {
    yield User.find(this.query).exec();
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
