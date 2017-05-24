import https from 'https';
import {facebook as cid} from './../../config/auth.json';


export default (accessToken, AT, email, name, id) => {
  return new Promise((res, rej) => {
    let data;
    const options = {
      host: 'graph.facebook.com',
      path: '/debug_token?input_token='+accessToken+'&access_token='+cid.accessToken
    }
    const req = https.get(options, (res) => {
      res.setEncoding('utf8');


      res.on('data', (d) => {
        data = JSON.parse(d);
        if(!data.data || !data.data.is_valid || data.data.is_valid !== true || data.data.app_id !== facebook.clientID || data.data.user_id !== id)
        res(false);
        const payName = name.split(" ");
        const user = {
          providerid: id,
          provider: 'facebook',
          fname: payName[0],
          lname: payName[payName.length-1],
          email: email,
          accounttype: AT
        }
        res(user);
      });


    }).on('error', (e) => {
      res(false);
    });
  });
}
