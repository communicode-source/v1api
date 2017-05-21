'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _test = require('./../../controller/test');

var _test2 = _interopRequireDefault(_test);

var _auth = require('./../../middleware/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Require the TestController


var router = _express2.default.Router();

router.route('/').get(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _test2.default.index(req, res);

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

router.route('/user/make').post(_passport2.default.authenticate('local-signup-dev', {
  session: false
}), function (req, res, next) {
  res.status(200).json({ "Message": "Created User Successfully" });
});

router.route('/testMiddle/:token').get(_auth.requireLogin, function (req, res) {
  res.status(200).json({ err: false, msg: req.userToken });
});

module.exports = router;
//# sourceMappingURL=index.js.map