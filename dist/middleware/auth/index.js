'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var requireLogin = exports.requireLogin = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
    var p;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            p = void 0;

            if (req.userToken) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return req.startSessUser(req);

          case 4:
            p = _context.sent;
            _context.next = 8;
            break;

          case 7:
            p = req.userToken;

          case 8:
            if (!(p === false)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', res.status(500).json({ err: true, msg: 'User not logged in' }));

          case 10:

            next();

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function requireLogin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map