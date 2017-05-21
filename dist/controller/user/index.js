'use strict';

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

// Require the Handler for the user.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./../../db/handler/user');

var _user2 = _interopRequireDefault(_user);

var _Response2 = require('./../Response.js');

var _Response3 = _interopRequireDefault(_Response2);

var _utils = require('./../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Utilities for the logins and sign ups because they contain a lot of logic.


var UserController = function (_Response) {
  _inherits(UserController, _Response);

  function UserController() {
    _classCallCheck(this, UserController);

    return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).apply(this, arguments));
  }

  _createClass(UserController, [{
    key: 'loginUser',


    /**
     * User Login - Logic for login routes.
     * @param req - Express Request object
     * @param res - Express Response object
    **/
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var dbHandler, authenticate, SC, data, query, users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(['facebook', 'google', 'local'].indexOf(req.body.provider) === -1)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', new _Response3.default(this.statusCode['error'], 'Mutated data'));

              case 2:
                dbHandler = new _user2.default();
                authenticate = void 0, SC = void 0, data = void 0;
                _context.prev = 4;

                // this is an abnoxious ternary but it prevents two other if statements.
                query = req.body.provider == 'local' ? { provider: 'local', email: req.body.email } : { providerid: req.body.providerid, provider: req.body.provider };
                _context.next = 8;
                return dbHandler.addQuery(query).readUsers();

              case 8:
                users = _context.sent;


                authenticate = req.body.provider == 'local' ? verifyLocalLoginUser(req, users, dbHandler) : verifyExternalUser(users);

                SC = this.statusCode[authenticate.status];
                data = SC == 'error' ? authenticate.data : (0, _utils.LoginDataPull)(authenticate.data);

                _context.next = 19;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](4);

                console.log(_context.t0);
                SC = this.statusCode['error'];
                data = 'Internal processing error.';

              case 19:
                return _context.abrupt('return', new _Response3.default(SC, data));

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 14]]);
      }));

      function loginUser(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);

  return UserController;
}(_Response3.default);

var controller = exports.controller = new UserController();
//# sourceMappingURL=index.js.map