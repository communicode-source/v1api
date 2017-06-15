var mongoose = require('mongoose');

var Project = mongoose.Schema({
  nonprofitId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: String,
  description: String,
  projectType: String,
  images: Array,
  types: Array,
  skills: Array,
  estimatedTime: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', Project);
