'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _test = require('./../../model/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestDBHandler = function () {
  function TestDBHandler() {
    _classCallCheck(this, TestDBHandler);
  }

  _createClass(TestDBHandler, [{
    key: 'findAll',


    /**
     * This function finds all Test items in DB
    **/
    value: function findAll() {
      return _test2.default.find().exec();
    }
  }]);

  return TestDBHandler;
}();

exports.default = TestDBHandler;
//# sourceMappingURL=index.js.map