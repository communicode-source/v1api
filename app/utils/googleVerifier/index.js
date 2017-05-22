import GoogleAuth from 'google-auth-library';
import {google as auth} from './../../config/auth.json';
export default (accessToken, AT) => {
  const auth = new GoogleAuth;

  const client = new auth.OAuth2(auth.clientID, '', '');
  return new Promise((response, reject) => {
    client.verifyIdToken(accessToken, auth.clientID, (e, login) => {
      if(e) {
        console.log(e);
        response(false);
      }
      const payload = login.getPayload();
      if(payload['aud'] !== auth.clientID || e) {
        response(false);
      }
      const user = {
        providerid: payload['sub'],
        provider: 'google',
        fname: payload['given_name'],
        lname: payload['family_name'],
        email: payload['email'],
        accounttype: AT
      }
      response(user);
    })
  });
}
