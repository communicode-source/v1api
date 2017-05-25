'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _passport = require('./../../../controller/passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./../../../config/auth.json');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport, userModel) {
  passport.use(new _passportFacebook2.default({
    clientID: _auth2.default.facebook.clientID,
    clientSecret: _auth2.default.facebook.clientSecret,
    callbackURL: _auth2.default.callbackURL + 'facebook',
    profileFields: ['id', 'emails', 'name']
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      var user = {
        "fname": profile._json.first_name,
        "lname": profile._json.last_name,
        "provider": "facebook",
        "id": profile.id,
        "email": profile._json.email
      };

      _passport2.default.passportFindOrCreate(user, done);
    });
  }));
}; // Passport plugin to add the facebook authentication strategy.
//# sourceMappingURL=facebook.js.map