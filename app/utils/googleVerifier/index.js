import GoogleAuth from 'google-auth-library';
import {google as cid} from './../../config/auth.json';


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
        fname: payload['given_name'],
        lname: payload['family_name'],
        email: payload['email'],
        accounttype: AT
      }
      return response(user);
    })
  });
}
