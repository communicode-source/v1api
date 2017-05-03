const jwt = require('jsonwebtoken');

// Returns the encoded JWT function.
module.exports = (json) => {
  json.iss = 'Communicode';
  json.exp = expiresIn(15);
  return jwt.sign(json, require('./../../config/auth.json').token)
}

// Determines the expiration date.
const expiresIn = numMin => new Date(new Date().getTime() + numMin*60000).getTime();
