'use strict'

const mongoose    = require('mongoose');
const libs        = require('./lib');
const userModel   = require('./../../model/user');
mongoose.Promise  = require('bluebird');


class User {

  constructor() {
    this.user             = null;
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

    return {exec: userModel.update({_id: this.user._id}, {$set: this.update}).exec(), cleanup: this.cleanup};
  }


  readAll() {
    return userModel.find({}).exec();
  }

  *readUsers() {
    yield userModel.find(this.query).exec();
  }

  cleanup(extent) {
    this.ready = false;
    this.query            = {};
    this.modified         = [];
    this.update           = {};
    this.prepFail         = null;
    if(extent)
      this.user = null;
  }

  /**
   * Updates User Attributes
   * @param data - object of attributes to update
   * @param id - ID of user
   * @param callback - Callback function
  **/
  updateOrganizationAndUrl(data, id, callback) {
    var modified = {};

    if(!this.isLoggedIn) {
      callback('No logged in user', null);
    }

    userAttr.findOne({userId: id}, function(err, user) {
      if(err)
        callback(err, null);

      user.organizationName = data.organizationName;
      user.url = data.organizationName.replace(/\s+/g, '').toLowerCase();

      if(user.organizationName !== null) {
        modified.organizationName = null;
      }

      if(user.url !== null) {
        modified.url = null;
      }


      if(modified.url) {
        process.nextTick(() => {
          user.url = data.organizationName.replace(/\s+/g, '').toLowerCase();
        });
        modified['url'] = null;
      } else {
        user.save();
      }

      if(user.save())
        callback(null, "Updated Successfully");
    });

  }

}
module.exports = User;
