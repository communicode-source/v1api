'use strict';


export default async (params, google, facebook) => {
  try{
    if(params.provider === 'google' && params.token_id) {
      return await google(params.token_id, params.accounttype);
    } else if(params.provider === 'facebook' && params.token_id) {
      return await facebook(params.token_id, params.token_id);
    }
    return false;
  } catch (e) {
    return false;
  }
}
