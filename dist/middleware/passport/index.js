'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _facebook = require('./providers/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _github = require('./providers/github');

var _github2 = _interopRequireDefault(_github);

var _google = require('./providers/google');

var _google2 = _interopRequireDefault(_google);

var _local = require('./providers/local');

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport) {
  (0, _facebook2.default)(passport);
  (0, _github2.default)(passport);
  (0, _google2.default)(passport);
  (0, _local2.default)(passport);
  return;
};
//# sourceMappingURL=index.js.map