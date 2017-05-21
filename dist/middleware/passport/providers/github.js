'use strict';

// Passport plugin to add the github authentication strategy.
var GithubStrategy = require('passport-github').Strategy;

var passportController = require('./../../../controller/passport');
var auth = require('./../../../config/auth.json');

module.exports = function (passport, userModel) {
  passport.use(new GithubStrategy({
    clientID: auth.github.clientID,
    clientSecret: auth.github.clientSecret,
    callbackURL: auth.callbackURL + 'github',
    profileFields: ['id', 'emails', 'name']
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      var user = {
        "fname": profile._json.name.split(" ")[0],
        "lname": profile._json.name.split(" ")[profile._json.name.split(" ").length - 1],
        "provider": "github",
        "id": profile.id,
        "email": profile._json.email
      };

      passportController.passportFindOrCreate(user, done);
    });
  }));
};
//# sourceMappingURL=github.js.map