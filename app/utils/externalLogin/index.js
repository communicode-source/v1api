'use strict';

export let verifyExternalUser =  (users) => {
  if(users.count !== 1) {
    const SC = 'error';
    const data = 'Too many users with the same provider ID';
  if else(users.)
  } else {
    // Need to verify provider refresh and oauth token here.
    const SC = 'success';
    const data = users[0];
  }

  return {status: SC, data: data};
}
