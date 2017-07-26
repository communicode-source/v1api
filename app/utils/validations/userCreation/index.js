'use strict';

export default async(info, dbHandler, length=0) => {
    let res = await dbHandler.addQuery({email: info.email}).readUsers();
    if(res.length > length) {
        throw new Error('Mismatch between desired number of users in DB and actual number: Desired: '+ length+', Actual: '+res.length)
    }
    if(info.provider !== 'local') {
        res = await dbHandler.addQuery({providerid: info.providerid, provider: info.provider}).readUsers();
        if(res.length != length) {
          throw new Error('Mismatch between desired number of users in DB and actual number: Desired: '+ length+', Actual: '+res.length)
        }
    }
    return (length === 1) ? res[0] : true;
}
