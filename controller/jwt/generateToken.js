const jwt = require('jsonwebtoken');

/** @param payload: require. This is a valid JSON to be encoded.
* Returns the encoded JWT.
* Depends on jsonwebtoken.
**/
module.exports = (json) => {
  json.iss    = 'Communicode';
  json.exp    = expiresIn(15);
  return jwt.sign(json, require('./../../config/auth.json').token)
}

// Determines the expiration date.
const expiresIn = numMin => new Date(new Date().getTime() + numMin*60000).getTime();
