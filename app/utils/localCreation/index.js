'use strict';

export let createLocalNewUser = (params, handle) => {
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
  if(!sendBack.password || !sendBack.email || !sendBack.provider || sendBack.provider !== 'local' || sendBack.email == "" || sendBack.password.trim() == "") {
    throw new Error('Invalid user properties')
  }
  sendBack.password = handle.makePassword(sendBack.password.trim())
  return sendBack;
}
