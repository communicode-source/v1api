"use strict";

var mongoose = require("mongoose");

// Export the schema for the "Greeting" object.
module.exports = mongoose.model('Test', {
  index: Number,
  isActive: Boolean,
  balance: Number,
  age: Number,
  eyeColor: String,
  name: String,
  gender: String,
  company: String,
  email: String
});
//# sourceMappingURL=index.js.map