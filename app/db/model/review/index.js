const mongoose = require("mongoose");

// Export the schema for the "review" objects.
var Review = mongoose.Schema({
  volunteer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  nonprofit_id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  rating: Number,
  projectType: String,
  review: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', Review);
