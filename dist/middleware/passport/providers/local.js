'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passport = require('./../../../controller/passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./../../../config/auth.json');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport) {
  var strategies = ['local-signup-dev', 'local-signup-nonprofit'];
  for (var i = 0; i < 2; i++) {
    passport.use(strategies[i], new _passportLocal2.default({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, function (req, email, password, done) {
      process.nextTick(function () {
        _passport2.default.passportCreateLocalUser(req, email, password, done);
      });
    }));
  };

  passport.use('local-login', new _passportLocal2.default({
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, done) {
    process.nextTick(function () {
      _passport2.default.passportLogInCurrentUser(email, password, done);
    });
  }));
};
//# sourceMappingURL=local.js.map