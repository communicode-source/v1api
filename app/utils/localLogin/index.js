'use strict';


// Ensures there are not too many users in the database that match qualifications, and also checks the password, etc.
export let verifyLocalLoginUser = (tryUser, user, dbHandler) => {
  if(!dbHandler.checkPassword(tryUser, user)) {
    throw new Error('Incorrect credentials')
  }

  return user
}
