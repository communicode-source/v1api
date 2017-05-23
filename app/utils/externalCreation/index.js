'use strict';


export default async (params, google, facebook) => {
  console.log(params);
  try{
    if(params.provider === 'google' && params.token_id) {
      return await google(params.token_id, params.accounttype);
    } else if(params.provider === 'facebook' && params.token_id) {
      return await facebook(params.token_id, params.accounttype, params.email, params.name, params.userid);
    }
    return false;
  } catch (e) {
    return false;
  }
}
