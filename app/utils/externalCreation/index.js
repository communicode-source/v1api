'use strict';


export default async (params, google, facebook) => {
  if(params.provider === 'google' && params.access_token) {
    return await google(params.access_token, params.accounttype);
  } else if(params.provider === 'google' && params.access_token) {
    return await facebook(params.access_token, params.accounttype);
  }
  return false;
}
