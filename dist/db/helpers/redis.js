'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _database = require('../../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = _redis2.default.createClient(_database2.default.redis.port, _database2.default.redis.host);

client.on('connect', function () {
  console.info("Redis successfully connected.");
});

exports.default = client;
//# sourceMappingURL=redis.js.map