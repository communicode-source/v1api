"use strict";

var mongoose = require("mongoose");

// Export the schema for the "certifications" objects.
module.exports = mongoose.model('Certification', {
  inProgress: Boolean,
  email: String,
  dualfactor: String,
  phonenumber: Number
});
//# sourceMappingURL=index.js.map