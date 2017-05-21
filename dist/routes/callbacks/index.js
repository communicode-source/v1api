'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* FACEBOOK OAUTH CALLBACKS
**/
router.route('/callback/facebook').get(_passport2.default.authenticate('facebook', {
  session: false,
  successRedirect: '/findPath',
  failureRedirect: '/'
}));

/**
* GITHUB OAUTH CALLBACKS
**/
router.route('/callback/github').get(_passport2.default.authenticate('github', {
  session: false,
  successRedirect: '/findPath',
  failureRedirect: '/'
}));

/**
* GOOGLE OAUTH CALLBACKS
**/
router.route('/callback/google').get(_passport2.default.authenticate('google', {
  session: false,
  successRedirect: '/findPath',
  failureRedirect: '/'
}));

/**
* LOCAL OAUTH CALLBACKS
**/
router.route('/local/register/dev') // Register Route.
.post(_passport2.default.authenticate('local-signup-dev', {
  session: false,
  successRedirect: '/findPath',
  failureRedirect: '/'
}));
router.route('/local/register/nonprofit') // Register Route.
.post(_passport2.default.authenticate('local-signup-nonprofit', {
  session: false,
  successRedirect: '/findPath',
  failureRedirect: '/'
}));
router.route('/local/login') // Login Route.
.post(_passport2.default.authenticate('local-login', {
  session: false,
  successRedirect: '/findPath',
  failureRedirect: '/'
}));

exports.default = router;
//# sourceMappingURL=index.js.map