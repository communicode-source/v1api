'use strict';

/**
 * @name jwtController
 * @author Cooper Campbell
 * Created at: 5/5/2017
 * A controller to handle logic for the JWT routes.
**/

// Require functions to verify and decode tokens.

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// Require function to generate tokens.


var _checkToken = require('./checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

var _generateToken = require('./generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JWTController = function () {
  function JWTController() {
    _classCallCheck(this, JWTController);
  }

  _createClass(JWTController, [{
    key: 'generate',

    /**
     * generate jwtController - Logic for /jwt/gen route
     * @param payload - JSON to be encoded.
     * @return JWS - Signed JWT token for distribution.
    **/
    value: function generate(payload) {
      return {
        err: false,
        msg: (0, _generateToken2.default)(payload)
      };
    }

    /**
    * decode jwtController - Logic for the /jwt/decode/:token route.
    * @param token - this is the JWS to have the payload unencrypted.
    * @return the JSON with err of false/true and a msg of either the decoded json or the error.
    **/

  }, {
    key: 'decode',
    value: function decode(token) {
      try {
        var check = new _checkToken2.default().ensureTokenAuthentic(0, token);
        var payload = check.next().value;
        return payload.msg !== null ? payload : { err: true, msg: 'Could not decode JWT' };
      } catch (e) {
        return checkJwtError(e);
      }
    }

    /**
    * check jwtController - Logic for the /jwt/check/:token route.
    * @param token - this is the JWS to be verified and decoded.
    * @param q - Express request object (normally would be called request or req).
    * @return A JSON with an err of true/false and a msg of either the
    **    decoded token payload or an error message.
    **/

  }, {
    key: 'check',
    value: function check(token, q) {
      try {
        var check = new _checkToken2.default().ensureTokenAuthentic(1, token);
        var payload = check.next().value;
        return check.next([payload, q]).value;
      } catch (e) {
        return checkJwtError(e);
      }
    }
  }]);

  return JWTController;
}();

exports.default = new JWTController();

/**
 * Private function that checks if the error thrown was by JWT or not.
 * if it was thrown by JWT then it becomes the msg, if not just return
 * something went wrong' and console.log the message.
**/

var checkJwtError = function checkJwtError(e) {
  if (e.name !== 'JsonWebTokenError') console.log(e);

  return {
    err: true,
    msg: e.name === 'JsonWebTokenError' ? e.message : 'Something went wrong'
  };
};
//# sourceMappingURL=index.js.map