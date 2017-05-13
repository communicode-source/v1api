'use strict'
/**
* Last Date Updated: 05.04.17
* @name controller/jwt/checkToken
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the jsonwebtoken.
**/
import jwt from 'jsonwebtoken';

class JWTClass {
  /**
  * ensureTokenAuthentic jwtClass - Logic for determining the validity of a token and decoding.
  * @param type - this is either 0 or 1, 0 for just decoding and 1 for verifying and decoding.
  * @return A JSON containing the payload or an error msg.
  **/
  *ensureTokenAuthentic(type, token) {
    if(type === 0)
      return {err: false, msg: jwt.decode(token)};
    let bundle = yield jwt.verify(token, require('./../../config/auth.json').token);
    return checkRules(bundle[0], bundle[1]);
  }
}

/**
* This is a private function used to check the rules that we have set in place
*   I.E. Checking the expiration date to make sure that the expiration date is not passed,
**    or checking the IP to make sure it originated from the same user.
**/
const checkRules = (payload, request) => {
  if(payload.exp < new Date().getTime()) {
    return {err: true, msg: 'JWT has expired'};
  }
  if(request.connection.remoteAddress !== payload.location) {
    return {err: true, msg: 'Request did not come from same origin'};
  }
  return {err: false, msg: payload};
}

module.exports = JWTClass;
