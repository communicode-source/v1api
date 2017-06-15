const mongoose = require('mongoose');

const Connection = mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId },
  object: { type: mongoose.Schema.Types.ObjectId },
  affinity: Number,
  isFollowing: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Connection', Connection);
