'use strict';

/**
 * @name TestController
 * @author Trevor Crupi
 * Created at: 5/3/2017
 * A controller to handle logic for the test routes.
**/

// Require DB Handler

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _test = require('./../../db/handler/test');

var _test2 = _interopRequireDefault(_test);

var _Response2 = require('../Response');

var _Response3 = _interopRequireDefault(_Response2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestController = function (_Response) {
  _inherits(TestController, _Response);

  function TestController() {
    _classCallCheck(this, TestController);

    return _possibleConstructorReturn(this, (TestController.__proto__ || Object.getPrototypeOf(TestController)).apply(this, arguments));
  }

  _createClass(TestController, [{
    key: 'index',


    /**
     * Index Test Controller - Logic for /test route
     * @param req - Express Request object
     * @param res - Express Response object
    **/
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var dbHandler, data, statusCode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dbHandler = new _test2.default();
                data = void 0, statusCode = void 0;
                _context.prev = 2;
                _context.next = 5;
                return dbHandler.findAll();

              case 5:
                data = _context.sent;

                statusCode = this.statusCode['success'];
                _context.next = 15;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);
                _context.next = 13;
                return dbHandler.findAll();

              case 13:
                data = _context.sent;

                statusCode = this.statusCode['not found'];

              case 15:
                return _context.abrupt('return', new _Response3.default(data, statusCode));

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function index(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return index;
    }()
  }]);

  return TestController;
}(_Response3.default);

module.exports = new TestController();
//# sourceMappingURL=index.js.map