'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportGoogleOauth = require('passport-google-oauth2');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _passport = require('./../../../controller/passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./../../../config/auth.json');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport, userModel) {
  passport.use(new _passportGoogleOauth2.default({
    clientID: _auth2.default.google.clientID,
    clientSecret: _auth2.default.google.clientSecret,
    callbackURL: _auth2.default.callbackUrl + 'google',
    profileFields: ['id', 'emails', 'name']
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      var user = {
        "fname": profile.displayName.split(" ")[0],
        "lname": profile.displayName.split(" ")[profile.displayName.split(" ").length - 1],
        "provider": "google",
        "id": profile.id,
        "email": profile.email
      };

      _passport2.default.passportFindOrCreate(user, done);
    });
  }));
}; // Passport plugin to add the google authentication strategy.
//# sourceMappingURL=google.js.map