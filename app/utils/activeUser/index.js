module.exports = (token) => {
  if(token == false || !token._id || !token.email) {
    return false;
  }

  return true;
};
