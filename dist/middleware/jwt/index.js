'use strict';

var _jwt = require('./../../controller/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res, next) {
  req.startSessUser = function (req, token) {
    if (!req.params.token && !req.body.token && !token) {
      return false;
    }
    var tk = req.params.token || req.body.token || token;
    var payload = _jwt2.default.check(tk, req);
    if (payload.err === true) {
      req.userToken = false;
      return req.userToken;
    }
    req.userToken = payload.msg;
    return req.userToken;
  };

  next();
};
//# sourceMappingURL=index.js.map