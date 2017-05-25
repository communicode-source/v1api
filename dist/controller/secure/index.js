'use strict';

/**
 * @name SecureController
 * @author Cooper Campbell
 * Created at: 5/15/2017
 * A controller to handle logic for the Secure routes.
**/

// Require DB Handler

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./../../db/handler/user');

var _user2 = _interopRequireDefault(_user);

var _Response2 = require('../Response');

var _Response3 = _interopRequireDefault(_Response2);

var _utils = require('./../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecureController = function (_Response) {
  _inherits(SecureController, _Response);

  function SecureController() {
    _classCallCheck(this, SecureController);

    return _possibleConstructorReturn(this, (SecureController.__proto__ || Object.getPrototypeOf(SecureController)).apply(this, arguments));
  }

  _createClass(SecureController, [{
    key: 'meUpdate',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var dbHandler, verifyUser, data, statusCode, validToken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dbHandler = new _user2.default();
                verifyUser = _utils2.default.CRUDUserBootstrap;
                data = void 0, statusCode = void 0, validToken = void 0;


                validToken = verifyUser.verify(req);

                data = verifyUser.formatUpdateData(req, true);

                _context.next = 7;
                return verifyUser.nameChangeProtection(validToken, data, dbHandler);

              case 7:
                data = _context.sent;

                try {
                  data = dbHandler.updateUser(validToken._id, data);
                  statusCode = this.statusCode['success'];
                } catch (err) {
                  data = { err: true, msg: 'Something went wrong when updating the user' };
                  statusCode = this.statusCode['error'];
                }

                return _context.abrupt('return', new _Response3.default(data, statusCode));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function meUpdate(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return meUpdate;
    }()
  }]);

  return SecureController;
}(_Response3.default);
//# sourceMappingURL=index.js.map