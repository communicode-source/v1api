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

router.route('/login').get(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.controller.loginUser(req, res);

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

module.exports = router;
//# sourceMappingURL=index.js.map