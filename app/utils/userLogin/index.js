'use strict';

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
    accounttype: user.accounttype,
    organizationname: user.organizationname
  }
}
