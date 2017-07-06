var mongoose = require('mongoose');

var Recover = mongoose.Schema({
    userID:  {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    urlHash: String,
    userHash: String,
    checked: Boolean,
    changed: Boolean,
    timestamp: String
});

module.exports = mongoose.model('Recover', Recover);
