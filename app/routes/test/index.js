import express, { Router } from 'express';
import passport from 'passport';
import https from 'https';
// Require the TestController
import controller from './../../controller/test';
import {requireLogin} from './../../middleware/auth';


const router = express.Router();

router.route('/')

  .get( async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });


router.route('/user/make')
    .post(passport.authenticate('local-signup-dev', {
        session: false
    }), (req, res, next) => {
      res.status(200).json({"Message": "Created User Successfully"});
    });

router.route('/testMiddle/:token')
  .get(requireLogin, (req, res) => {
    res.status(200).json({err: false, msg: req.userToken});
  });
router.route('/d')
  .get((q, s) => {
    let data;
    const accessToken = 'EAACVYbE04hoBABkHzfqwQREeslnxMCThs0MAG4YhwbMOZCyq6M2fjGWmzfFZBmL0AkXGSxkXM0cS6qrNz4YGIjH9RRdwTDTxCuSwYTVd0Ucfxt4qpLYJsnEy7wwLFB9TjuzBVuBiaKFv6GXzk230uZAZB0RjLLdSeYwLljVWWHWVxOHNiZA57qvhq6KG5NMEZD';
    const cid = '164246817399322|E5QlQISNUx-TJ6fnF7PnqGwiRf0';
    const options = {
      host: 'graph.facebook.com',
      path: '/debug_token?input_token='+accessToken+'&access_token='+cid
    }
    // const url = "https://graph.facebook.com/debug_token?input_token="+accessToken+"&access_token="+cid.accessToken;
    const req = https.get(options, (res) => {
      res.setEncoding('utf8');


      res.on('data', (d) => {
        data = JSON.parse(d);

        // if(data.data.is_valid !== true || data.data.app_id !== facebook.clientID || data.data.user_id !== id)
        // s.send(false);
        const payName = 'Cooper Daniel Campbell'.split(" ");
        const email= 'ihatehtis';
        const id = 'this is an id';
        const AT = 1;
        const user = {
          providerid: id,
          provider: 'facebook',
          fname: payName[0],
          lname: payName[payName.length-1],
          email: email,
          accounttype: AT
        }
      });


    });
    req.on('error', (e) => {
      s.send(false);
    })
  })

module.exports = router;
