'use strict';

export default async(info, dbHandler) => {
  const query = (info.provider == 'local') ? {email: info.email, provider: 'local'} : {providerid: info.providerid, provider: info.provider};

  const res = await dbHandler.addQuery(query).readUsers();

  if(res.length != 0)
    return false;
  return true;
}
