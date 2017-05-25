'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _callbacks = require('./callbacks');

var _callbacks2 = _interopRequireDefault(_callbacks);

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _jwt = require('./jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _projects = require('./projects');

var _projects2 = _interopRequireDefault(_projects);

var _secure = require('./secure');

var _secure2 = _interopRequireDefault(_secure);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* List the objects of the routers here in alphabetical order please.
* Also space them so that the = always starts on the same column.
**/
var routes = {
  '/': _home2.default,
  '/jwt': _jwt2.default,
  '/projects': _projects2.default,
  '/secure': _secure2.default,
  '/test': _test2.default,
  '/update': _callbacks2.default
};

exports.default = function (app) {
  for (var i in routes) {
    app.use(i, routes[i]);
  }
};
//# sourceMappingURL=index.js.map