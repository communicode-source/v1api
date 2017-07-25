'use strict';


export default async (params, google, facebook) => {
  let providerCheck
  if(params.token_id) {
    providerCheck = (params.provider === 'google')
        ? await google(params.token_id, params.accountType)
        : (params.provider === 'facebook')
          ? await facebook(params.token_id, params.accountType, params.email, params.name, params.userid)
          : false
  }
  if(!providerCheck || providerCheck === false) {
    throw new Error('Invalid provider and/or token')
    return
  }
  return providerCheck
}
