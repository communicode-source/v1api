const mongoose = require('mongoose');

const Match = mongoose.Schema({
  developerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  nonprofitId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  isMatched: {type: Boolean, default: false}
});

module.exports = mongoose.model('Match', Match);
