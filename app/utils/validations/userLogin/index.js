'use strict';

// This limits what fields come out of the database so that a password is not returned.
export let LoginDataPull = user => {
  return {
    _id: user._id,
    provider: user.provider,
    email: user.email,
    fname: user.fname,
    lname: user.lname,
    url: user.url,
    interests: user.interests,
    skills: user.skills,
    nonprofittype: user.nonprofittype,
    accountType: user.accountType,
    organizationname: user.organizationname
  }
}


export let verifyExternalProviderKey = req => {

}
