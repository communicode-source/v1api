import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';

import mongo from './mongo';
import passportMiddleware from './passport';
import sanatizer from './sanatizer';
import {sourced} from './sourced';
import tokenMiddleware from './jwt';

import fileUpload from 'express-fileupload';
import sanitize from 'sanitizer';

module.exports = (app) => {


 // Altering prototypes to help with security things.
  String.prototype.sanitize = function() {
      return sanitize.escape(this.toString());
  }

  String.prototype.isPassword = function() {
      return (this.length >= 6);
  }

  String.prototype.isEmail = function() {
      const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(reg.test(this.toString())) {
          return true;
      }
      return false;
  }
  // Weird glitch. This causes mongoose to fail.
  // Object.prototype.removeKeys = function(objectToRemove) {
  // 		for(const i in this) {
  //     		if(objectToRemove.indexOf(i) !== -1) {
  //         		delete this[i];
  //         }
  //     }
  // }
  //
  // Object.prototype.onlyKeys = function(objectToKeep) {
  // 		for(const i in this) {
  //     		if(objectToKeep.indexOf(i) === -1) {
  //         		delete this[i];
  //         }
  //     }
  // }

  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 3);

  app.use(fileUpload());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', tokenMiddleware);

  app.use(sanatizer);

  app.use(logger('dev'));

  app.use(cors());

  mongo();

  sourced.connect();


  // Mongo middleware must come before.
  passportMiddleware(passport);
  app.use(passport.initialize());
}
