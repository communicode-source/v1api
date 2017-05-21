'use strict';

export let createLocalNewUser = (params) => {
  const fields           = ['email',
                            'accounttype',
                            'provider',
                            'password',
                            'fname',
                            'lname',
                            'organizationname',
                            'url',
                            'urlnum',
                            'nonprofittype',
                            'skills',
                            'interests'];
  const sendBack = {};
  for(let i in params) {
    if(fields.indexOf(i) == -1) {
      continue;
    }
    sendBack[i] = params[i];
  }
  if(!sendBack.password || !sendBack.email || !sendBack.provider || sendBack.provider !== 'local') {
    return false;
  }
  return sendBack;
}
