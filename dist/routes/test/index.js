'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

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
router.route('/d').get(function (q, s) {
  var data = void 0;
  var accessToken = 'EAACVYbE04hoBABkHzfqwQREeslnxMCThs0MAG4YhwbMOZCyq6M2fjGWmzfFZBmL0AkXGSxkXM0cS6qrNz4YGIjH9RRdwTDTxCuSwYTVd0Ucfxt4qpLYJsnEy7wwLFB9TjuzBVuBiaKFv6GXzk230uZAZB0RjLLdSeYwLljVWWHWVxOHNiZA57qvhq6KG5NMEZD';
  var cid = '164246817399322|E5QlQISNUx-TJ6fnF7PnqGwiRf0';
  var options = {
    host: 'graph.facebook.com',
    path: '/debug_token?input_token=' + accessToken + '&access_token=' + cid
  };
  // const url = "https://graph.facebook.com/debug_token?input_token="+accessToken+"&access_token="+cid.accessToken;
  var req = _https2.default.get(options, function (res) {
    res.setEncoding('utf8');

    res.on('data', function (d) {
      data = JSON.parse(d);

      // if(data.data.is_valid !== true || data.data.app_id !== facebook.clientID || data.data.user_id !== id)
      // s.send(false);
      var payName = 'Cooper Daniel Campbell'.split(" ");
      var email = 'ihatehtis';
      var id = 'this is an id';
      var AT = 1;
      var user = {
        providerid: id,
        provider: 'facebook',
        fname: payName[0],
        lname: payName[payName.length - 1],
        email: email,
        accounttype: AT
      };
    });
  });
  req.on('error', function (e) {
    s.send(false);
  });
});

module.exports = router;
//# sourceMappingURL=index.js.map