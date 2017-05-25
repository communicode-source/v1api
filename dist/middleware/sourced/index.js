'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourced = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('./../../config/database.js');

var _database2 = _interopRequireDefault(_database);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mongo = function () {
  function Mongo() {
    _classCallCheck(this, Mongo);
  }

  _createClass(Mongo, [{
    key: 'connect',
    value: function connect() {
      var _this = this;

      return new Promise(function (res, rej) {
        _mongodb.MongoClient.connect(_database2.default.url, function (err, db) {
          if (err) {
            console.log('Did you forget to run Mongo?');
            res();
          }
          console.log('Reconnecting');
          _this.db = db;
          res();
        });
      });
    }
  }, {
    key: 'returnConnection',
    value: function returnConnection() {
      return this.db;
    }
  }]);

  return Mongo;
}();

var sourced = exports.sourced = new Mongo();
//# sourceMappingURL=index.js.map