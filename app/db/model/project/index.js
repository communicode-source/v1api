var mongoose = require('mongoose');

var Project = mongoose.Schema({
  nonprofitId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: String,
  description: String,
  projectType: String,
  image: Object,
  item: String,
  type: String,
  interests: Array,
  skills: Array,
  startTime: String,
  endTime: String,
  developerCost: Number,
  totalCost: Number,
  isDraft: { type: Boolean, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', Project);
