'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @param payload: require. This is a valid JSON to be encoded.
* Returns the encoded JWT.
* Depends on jsonwebtoken.
**/
exports.default = function (json) {
  json.iss = 'Communicode';
  json.exp = expiresIn(15);
  return _jsonwebtoken2.default.sign(json, require('./../../config/auth.json').token);
};

// Determines the expiration date.


var expiresIn = function expiresIn(numMin) {
  return new Date(new Date().getTime() + numMin * 60000).getTime();
};
//# sourceMappingURL=generateToken.js.map