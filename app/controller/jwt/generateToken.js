import jwt from 'jsonwebtoken';

/** @param payload: require. This is a valid JSON to be encoded.
* Returns the encoded JWT.
* Depends on jsonwebtoken.
**/
export default (json, time) => {
  json.iss    = 'Communicode';
  json.exp    = expiresIn(time);
  return jwt.sign(json, require('./../../config/auth.json').token)
}

// Determines the expiration date.
const expiresIn = numMin => new Date(new Date().getTime() + numMin*60000).getTime();
