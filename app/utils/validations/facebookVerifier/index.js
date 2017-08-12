import https from 'https';
import {facebook as cid} from './../../../config/auth.json';


export default (accessToken, AT, email, name, id) => {
  return new Promise((response, rej) => {
    let data;
    const options = {
      host: 'graph.facebook.com',
      path: '/debug_token?input_token='+accessToken+'&access_token='+cid.accessToken
    }
    const req = https.get(options, (res) => {
      res.setEncoding('utf8');


      res.on('data', (d) => {
        data = JSON.parse(d);
        if(!data.data || data.data.is_valid !== true || data.data.app_id !== cid.clientID || data.data.user_id !== id) {
          return response(false)
        }
        const payName = name.split(" ");
        const user = {
          providerid: id,
          provider: 'facebook',
          fname: (+AT === 0) ? payName[0] : null,
          lname: (+AT === 0) ? payName[payName.length-1] : null,
          organizationname:  (+AT === 1) ? name : null,
          email: email,
          accountType: +AT
        }
          response(user);
      });


    }).on('error', (e) => {
        return response(false)
    });
  });
}
