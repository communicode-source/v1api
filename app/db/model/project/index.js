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
  matched: {type: Boolean, default: false},
  confirmed: {type: Boolean, default: false},
  potential: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
  isDraft: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', Project);
