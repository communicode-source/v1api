const mongoose = require('mongoose');

const Connection = mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId },
  following: { type: mongoose.Schema.Types.ObjectId },
  affinity: Decimal,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Connection', Connection);
