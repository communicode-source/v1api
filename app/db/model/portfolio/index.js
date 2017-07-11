var mongoose = require('mongoose');

var Portfolio = mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: String,
  description: String,
  projectType: String,
  has_image: Boolean,
  tags: Array,
  date_created: String,
  website: String,
  github: String,
  is_draft: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', Project);
