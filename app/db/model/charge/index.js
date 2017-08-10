const mongoose = require('mongoose');

const Charge = mongoose.Schema({
  chargeId: {type: String, required: true},
  nonprofitId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nonprofitStripeAccount: {type: String},
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  devId: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
  purpose: {type: String, default: 'charge'},
  cost: { type: Number, required: true }
});

module.exports = mongoose.model('Charge', Charge);
