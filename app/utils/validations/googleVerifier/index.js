import GoogleAuth from 'google-auth-library';
import {google as cid} from './../../../config/auth.json';


export default (accessToken, AT) => {
  const auth = new GoogleAuth;
  const client = new auth.OAuth2(cid.clientID, '', '');
  return new Promise((response, reject) => {
    client.verifyIdToken(accessToken, cid.clientID, function(e, login) {
      if(e) {
        throw new Error(e)
        return response(false);
      }
      const payload = login.getPayload();
      if(payload['aud'] !== cid.clientID) {
        throw new Error('Token not meant for Communicode')
        return response(false)
      }
      const user = {
        providerid: payload['sub'],
        provider: 'google',
        fname: (+AT === 0) ? payload['given_name'] : null,
        lname: (+AT === 0) ? payload['family_name'] : null,
        organizationname: (+AT === 1) ? (payload['given_name'] + ' ' + payload['family_name']) : null,
        email: payload['email'],
        accountType: +AT
      }
      return response(user);
    })
  });
}
