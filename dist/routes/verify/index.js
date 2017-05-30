'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./../../controller/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * Last Date Updated: 05.04.17
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @name verify/index
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @author Cooper Campbell
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * This routes the home api route '/'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * This depends on the express router, and passport.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           **/


var router = _express2.default.Router();

router.route('/').get(function (req, res) {
  res.status(200).json({ err: true, msg: 'Must use POST method.' });
}).post(function (req, res) {
  res.status(200).json({ err: false, token: 'Under construction ATM. You are at the right spot!' });
});

router.route('/login').post(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.controller.loginUser(req, res);

          case 3:
            response = _context.sent;


            res.status(response.getStatusCode()).json(response.getJSONData());
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            res.status(200).json({ err: true, msg: 101 });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.route('/create').post(function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user.controller.createUser(req, res);

          case 2:
            response = _context2.sent;

            try {
              res.status(response.getStatusCode()).json(response.getJSONData());
            } catch (e) {
              console.log(e);
              console.log(response);
              res.status(500).json({ err: true, msg: 'Something went wrong' });
            }

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

module.exports = router;
//# sourceMappingURL=index.js.map