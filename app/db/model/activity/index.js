const mongoose = require('mongoose');

const Activity = mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verb: String,
  object: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Activity', Activity);
