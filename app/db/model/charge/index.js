const mongoose = require('mongoose');

const Charge = mongoose.Schema({
  chargeId: {type: String, required: true},
  nonprofitId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nonprofitStripeAccount: {type: String, required: true},
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  cost: { type: Number, required: true }
});

module.exports = mongoose.model('Charge', Charge);
