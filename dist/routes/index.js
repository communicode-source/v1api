'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _callbacks = require('./callbacks');

var _callbacks2 = _interopRequireDefault(_callbacks);

var _certification = require('./certification');

var _certification2 = _interopRequireDefault(_certification);

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

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = {
  '/': _home2.default,
  '/certifications': _certification2.default,
  '/jwt': _jwt2.default,
  '/projects': _projects2.default,
  '/secure': _secure2.default,
  '/test': _test2.default,
  '/search': _search2.default,
  '/update': _callbacks2.default,
  '/verify': _verify2.default
}; /**
   * List the objects of the routers here in alphabetical order please.
   * Also space them so that the = always starts on the same column.
   **/

exports.default = function (app) {
  for (var i in routes) {
    app.use(i, routes[i]);
  }
};
//# sourceMappingURL=index.js.map