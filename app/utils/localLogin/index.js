'use strict';


// Ensures there are not too many users in the database that match qualifications, and also checks the password, etc.
export let verifyLocalLoginUser = (req, users, dbHandler) => {
  if(users.count != 1) {
    const SC = 'error';
    const data = 'No user with that email';
  } else {
    if(!dbHandler.checkPassword(req.body.sanatized.password, user[0])) {
      const SC = 'error';
      const data = 'Something went wrong';
    } else {
      const SC = 'success';
      const data = users[0];
    }
  }

  return {status: SC, data: data};
}
