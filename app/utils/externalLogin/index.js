'use strict';

// Ensures there arent too many users in the db that match qualifications.
export let verifyExternalUser =  (users) => {
  if(users.count !== 1) {
    const SC = 'error';
    const data = 'Too many users with the same provider ID';
  } else {
    // Need to verify provider refresh and oauth token here.
    const SC = 'success';
    const data = users[0];
  }

  return {status: SC, data: data};
}
