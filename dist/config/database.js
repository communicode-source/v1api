'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// app/config/database.js
// Just return the model export for the port of the MongoDB.


var config = {
  'mongo': {
    'url': 'mongodb://127.0.0.1:27017/communicode'
  },
  'redis': {
    'host': '127.0.0.1',
    'port': '6379'
  }
};

exports.default = config;
//# sourceMappingURL=database.js.map