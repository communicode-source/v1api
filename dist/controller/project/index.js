'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _project = require('./../../db/handler/project');

var _project2 = _interopRequireDefault(_project);

var _Response2 = require('../Response');

var _Response3 = _interopRequireDefault(_Response2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectController = function (_Response) {
  _inherits(ProjectController, _Response);

  function ProjectController() {
    _classCallCheck(this, ProjectController);

    return _possibleConstructorReturn(this, (ProjectController.__proto__ || Object.getPrototypeOf(ProjectController)).apply(this, arguments));
  }

  _createClass(ProjectController, [{
    key: 'index',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var dbHandler, data, statusCode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dbHandler = new _project2.default();
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
  }, {
    key: 'findProject',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var dbHandler, id, data, statusCode;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dbHandler = new _project2.default();
                id = req.params.id;
                data = void 0, statusCode = void 0;
                _context2.prev = 3;
                _context2.next = 6;
                return dbHandler.findById(id);

              case 6:
                data = _context2.sent;

                statusCode = this.statusCode['success'];
                _context2.next = 16;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](3);
                _context2.next = 14;
                return dbHandler.findById(id);

              case 14:
                data = _context2.sent;

                statusCode = this.statusCode['not found'];

              case 16:
                return _context2.abrupt('return', new _Response3.default(data, statusCode));

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function findProject(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return findProject;
    }()
  }]);

  return ProjectController;
}(_Response3.default);

exports.default = new ProjectController();
//# sourceMappingURL=index.js.map