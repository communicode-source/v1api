const jwt = require('jsonwebtoken');


// Returns the decoded JWT if there is no error.
const ensureTokenAuthentic = (token) => {
  try {
    const decode = jwt.verify(token, require('./../../config/auth.json').token);

    const valid = checkRules(decode);

    return (valid.err === true) ? valid : {err: false, msg: decode};


  } catch(e) {
    if(e) {
      return {err: true, msg: "Incorrect signature"};
    }
  }
}

// Checks for implicit rules decided by us.
const checkRules = (payload) => {
  if(payload.exp < new Date().getTime()) {
    return {err: true, msg: 'JWT has expired'};
  }

  return {err: false};
}

module.exports = ensureTokenAuthentic;
