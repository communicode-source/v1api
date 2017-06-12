const mongoose = require('mongoose');

const Bookmark = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  projectId: {type: mongoose.Schema.Types.ObjectId, re: "Project"},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', Bookmark);
