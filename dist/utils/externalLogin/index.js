'use strict';

// Ensures there arent too many users in the db that match qualifications.

Object.defineProperty(exports, "__esModule", {
  value: true
});
var verifyExternalUser = exports.verifyExternalUser = function verifyExternalUser(users) {
  if (users.count !== 1) {
    var _SC = 'error';
    var _data = 'Too many users with the same provider ID';
  } else {
    // Need to verify provider refresh and oauth token here.
    var _SC2 = 'success';
    var _data2 = users[0];
  }

  return { status: SC, data: data };
};
//# sourceMappingURL=index.js.map