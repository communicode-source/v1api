"use strict";

module.exports = function (token) {
  if (token == false || !token._id || !token.email) {
    return false;
  }

  return true;
};
//# sourceMappingURL=index.js.map