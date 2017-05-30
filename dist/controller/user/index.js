'use strict';

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jwt = require('./../jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _Response2 = require('./../Response.js');

var _Response3 = _interopRequireDefault(_Response2);

var _user = require('./../../db/handler/user');

var _user2 = _interopRequireDefault(_user);

var _validations = require('./../../utils/validations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Require the Handler for the user.

// Utilities for the logins and sign ups because they contain a lot of logic.


var UserController = function (_Response) {
  _inherits(UserController, _Response);

  function UserController() {
    _classCallCheck(this, UserController);

    return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).apply(this, arguments));
  }

  _createClass(UserController, [{
    key: 'loginUser',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var contents, dbHandler, isLocal, status, data, newUser, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Declarations of constants
                contents = req.body.sanitized;
                dbHandler = new _user2.default();
                isLocal = req.body.sanitized.provider === 'local';
                // Declarations of  variables

                status = void 0, data = void 0, newUser = void 0;
                _context.prev = 4;
                user = contents;

                // Gets the user from the database and does checking to ensure passwords match, etc.

                if (!isLocal) {
                  _context.next = 12;
                  break;
                }

                _context.next = 9;
                return (0, _validations.isLocalUser)(user, dbHandler);

              case 9:
                _context.t0 = _context.sent;
                _context.next = 20;
                break;

              case 12:
                _context.t1 = _validations.uniqueUser;
                _context.next = 15;
                return (0, _validations.createExternalUser)(contents);

              case 15:
                _context.t2 = _context.sent;
                _context.t3 = dbHandler;
                _context.next = 19;
                return (0, _context.t1)(_context.t2, _context.t3, 1);

              case 19:
                _context.t0 = _context.sent;

              case 20:
                user = _context.t0;


                // Create the status code and the user JWT as data.
                status = this.statusCode['success'];
                data = _jwt2.default.generate((0, _validations.LoginDataPull)(_validations.uniqueUser));

                _context.next = 30;
                break;

              case 25:
                _context.prev = 25;
                _context.t4 = _context['catch'](4);

                console.log(_context.t4);
                status = this.statusCode['success'];
                data = 100;

              case 30:
                return _context.abrupt('return', new _Response3.default(data, status));

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 25]]);
      }));

      function loginUser(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return loginUser;
    }()
  }, {
    key: 'createUser',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var contents, dbHandler, isLocal, status, data, newUser, unique;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Declarations of constants
                contents = req.body.sanitized;
                dbHandler = new _user2.default();
                isLocal = req.body.sanitized.provider === 'local';
                // Declarations of  variables

                status = void 0, data = void 0, newUser = void 0;
                _context2.prev = 4;

                if (!isLocal) {
                  _context2.next = 9;
                  break;
                }

                _context2.t0 = (0, _validations.createLocalUser)(contents, dbHandler);
                _context2.next = 12;
                break;

              case 9:
                _context2.next = 11;
                return (0, _validations.createExternalUser)(contents);

              case 11:
                _context2.t0 = _context2.sent;

              case 12:
                newUser = _context2.t0;
                _context2.next = 15;
                return (0, _validations.uniqueUser)(newUser, dbHandler);

              case 15:
                unique = _context2.sent;
                _context2.next = 18;
                return dbHandler.createUser(newUser);

              case 18:
                newUser = _context2.sent;


                // Create the status code and the user JWT as data.
                status = this.statusCode['success'];
                data = _jwt2.default.generate((0, _validations.LoginDataPull)(newUser));

                _context2.next = 28;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t1 = _context2['catch'](4);

                console.log(_context2.t1);
                status = this.statusCode['success'];
                data = 100;

              case 28:
                return _context2.abrupt('return', new _Response3.default(data, status));

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 23]]);
      }));

      function createUser(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return createUser;
    }()
  }]);

  return UserController;
}(_Response3.default);

var controller = exports.controller = new UserController();
//# sourceMappingURL=index.js.map