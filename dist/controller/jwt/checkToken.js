'use strict';
/**
* Last Date Updated: 05.04.17
* @name controller/jwt/checkToken
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the jsonwebtoken.
**/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JWTClass = function () {
  function JWTClass() {
    _classCallCheck(this, JWTClass);
  }

  _createClass(JWTClass, [{
    key: 'ensureTokenAuthentic',

    /**
    * ensureTokenAuthentic jwtClass - Logic for determining the validity of a token and decoding.
    * @param type - this is either 0 or 1, 0 for just decoding and 1 for verifying and decoding.
    * @return A JSON containing the payload or an error msg.
    **/
    value: regeneratorRuntime.mark(function ensureTokenAuthentic(type, token) {
      var bundle;
      return regeneratorRuntime.wrap(function ensureTokenAuthentic$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(type === 0)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', { err: false, msg: _jsonwebtoken2.default.decode(token) });

            case 2:
              _context.next = 4;
              return _jsonwebtoken2.default.verify(token, require('./../../config/auth.json').token);

            case 4:
              bundle = _context.sent;
              return _context.abrupt('return', checkRules(bundle[0], bundle[1]));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, ensureTokenAuthentic, this);
    })
  }]);

  return JWTClass;
}();

/**
* This is a private function used to check the rules that we have set in place
*   I.E. Checking the expiration date to make sure that the expiration date is not passed,
**    or checking the IP to make sure it originated from the same user.
**/


var checkRules = function checkRules(payload, request) {
  if (payload.exp < new Date().getTime()) {
    return { err: true, msg: 'JWT has expired' };
  }
  if (request.connection.remoteAddress !== payload.location) {
    return { err: true, msg: 'Request did not come from same origin' };
  }
  return { err: false, msg: payload };
};

module.exports = JWTClass;
//# sourceMappingURL=checkToken.js.map