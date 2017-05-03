const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
  console.log(jwt.decode(token));
  return jwt.decode(token);
}

module.exports = decodeToken;
