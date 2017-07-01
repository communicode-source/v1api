'use strict'

/**
 * @name jwtController
 * @author Cooper Campbell
 * Created at: 5/5/2017
 * A controller to handle logic for the JWT routes.
**/

// Require functions to verify and decode tokens.
import checkToken from './checkToken';

// Require function to generate tokens.
import genToken from './generateToken';


class JWTController {
  /**
   * generate jwtController - Logic for /jwt/gen route
   * @param payload - JSON to be encoded.
   * @return JWS - Signed JWT token for distribution.
  **/
  generate(payload, time = 15) {
    return {
      err: false,
      msg: genToken(payload, time)
    };
  }

  /**
  * decode jwtController - Logic for the /jwt/decode/:token route.
  * @param token - this is the JWS to have the payload unencrypted.
  * @return the JSON with err of false/true and a msg of either the decoded json or the error.
  **/
  decode(token) {
    try {
      const check = new checkToken().ensureTokenAuthentic(0, token);
      const payload =  check.next().value;
      return (payload.msg !== null) ? payload : { err: true, msg: 'Could not decode JWT' };
    }
    catch (e) {
      return checkJwtError(e);
    }
  }

  /**
  * check jwtController - Logic for the /jwt/check/:token route.
  * @param token - this is the JWS to be verified and decoded.
  * @param q - Express request object (normally would be called request or req).
  * @return A JSON with an err of true/false and a msg of either the
  **    decoded token payload or an error message.
  **/
  check(token, q) {
    try {
      const check = new checkToken().ensureTokenAuthentic(1, token);
      const payload = check.next().value;
      return check.next([payload, q]).value;
    }
    catch(e) {
      return checkJwtError(e);
    }
  }
}

export default new JWTController();

/**
 * Private function that checks if the error thrown was by JWT or not.
 * if it was thrown by JWT then it becomes the msg, if not just return
 * something went wrong' and console.log the message.
**/

const checkJwtError = (e) => {
  if(e.name !== 'JsonWebTokenError')
    console.log(e);

  return {
    err: true,
    msg: (e.name === 'JsonWebTokenError') ? e.message : 'Something went wrong'
  };
}
