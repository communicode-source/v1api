'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _certification = require('./../../controller/certification');

var _certification2 = _interopRequireDefault(_certification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//Require the certificationController


var router = _express2.default.Router();

router.route('/')

//lists all the certified nonprofits
.get(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _certification2.default.index(req, res);

          case 2:
            response = _context.sent;


            res.status(response.getStatusCode()).json(response.getJSONData());

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//route that has the ID as the input and returns information about a specific nonprofit
router.route('/:id').get(function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _certification2.default.certify(req, res);

          case 2:
            response = _context2.sent;


            res.status(response.getStatusCode()).json(response.getJSONData());

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.route('/certify/:id')
//returns true/false based on the status of isCertifid of the nonprofits account
.get(function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _certification2.default.certify(req, res);

          case 2:
            response = _context3.sent;

            if (!(response.getJSONData() == null)) {
              _context3.next = 8;
              break;
            }

            res.status(200).json({
              msg: 'False'
            });
            return _context3.abrupt('return');

          case 8:
            res.status(response.getStatusCode()).json(response.getJSONData());
            return _context3.abrupt('return');

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=index.js.map