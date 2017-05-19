'use strict';

export let verifyLocalLoginUser = (req, users, dbHandler) => {
  if(users.count != 1) {
    const SC = 'error';
    const data = 'No user with that email';
  } else {
    if(!dbHandler.checkPassword(req.body.password, user[0])) {
      const SC = 'error';
      const data = 'Something went wrong';
    } else {
      const SC = 'success';
      const data = users[0];
    }
  }

  return {status: SC, data: data};
}
