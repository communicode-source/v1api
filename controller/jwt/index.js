const genToken    = require('./generateToken');
const decodeToken = require('./decodeToken');
const checkToken  = require('./checkToken');

module.exports = {
  generate: (payload) => {
  return {err: false, token: genToken(payload)};
  },
  decode  : decodeToken,
  check   : (token) => {
    const validity = checkToken(token);
    return {err: validity.err, token: validity.msg};
  }
}
