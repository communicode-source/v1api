'use strict';


// Ensures there are not too many users in the database that match qualifications, and also checks the password, etc.
export let verifyLocalLoginUser = (req, users, dbHandler) => {
  let SC, data;
  if(users.length != 1) {
    SC = 'error';
    data = 'No user with that email';
  } else {
    if(!dbHandler.checkPassword(req.body.sanitized.password, users[0])) {
      SC = 'error';
      data = 'Incorrect password';
    } else {
      SC = 'success';
      data = users[0];
    }
  }

  return {status: SC, data: data};
}
