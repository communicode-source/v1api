'use strict';

var mongoose = require('mongoose');

var Project = mongoose.Schema({
  nonprofitId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  projectType: String,
  imageUpload: String,
  types: Array,
  skills: Array,
  estimatedTime: String,
  createdAt: Date
});

module.exports = mongoose.model('Project', Project);
//# sourceMappingURL=index.js.map