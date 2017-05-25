'use strict';

export default async(info, dbHandler, length=0) => {
  const query = (info.provider == 'local') ? {email: info.email, provider: 'local'} : {providerid: info.providerid, provider: info.provider};
    const res = await dbHandler.addQuery(query).readUsers();
    if(res.length != length) {
      throw new Error('Mismatch between desired number of users in DB and actual number: Desired: '+ length+', Actual: '+res.length)
    }
    return true;
}
