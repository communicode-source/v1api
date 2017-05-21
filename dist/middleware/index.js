'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongo = require('./mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _passport3 = require('./passport');

var _passport4 = _interopRequireDefault(_passport3);

var _sanatizer = require('./sanatizer');

var _sanatizer2 = _interopRequireDefault(_sanatizer);

var _sourced = require('./sourced');

var _jwt = require('./jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {

  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 3);

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));

  app.use('/', _jwt2.default);

  app.use(_sanatizer2.default);

  app.use((0, _morgan2.default)('dev'));

  app.use((0, _cors2.default)());

  (0, _mongo2.default)();
  _sourced.sourced.connect();

  // Mongo middleware must come before.
  (0, _passport4.default)(_passport2.default);
  app.use(_passport2.default.initialize());
};
//# sourceMappingURL=index.js.map