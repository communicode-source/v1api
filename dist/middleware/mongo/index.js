'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('./../../config/database.js');

var _database2 = _interopRequireDefault(_database);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  _mongoose2.default.Promise = _bluebird2.default;
  _mongoose2.default.connect(_database2.default.url);

  _mongoose2.default.connection.on('error', function () {
    console.info("Could not run mongodb, did you forget to run mongod?");
  });
};
//# sourceMappingURL=index.js.map