/**
* Last Date Updated: 05.04.17
* @name verify/index
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the express router, and passport.
**/
import express, {Router} from 'express';

import {controller} from './../../controller/user';
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).json({err: true, msg: 'Must use POST method.'});
  })
  .post((req, res) => {
    res.status(200).json({err: false, token: 'Under construction ATM. You are at the right spot!'});
  })

router.route('/login')
  .post(async (req, res) => {
    try{
      const response = await controller.loginUser(req, res);

      res.status(response.getStatusCode()).json(response.getJSONData());
    } catch(e) {
      res.status(200).json({err: true, msg: 101})
    }
  });

router.route('/create')
  .post(async (req, res) => {
    try{
      const response = await controller.createUser(req, res);
      res.status(response.getStatusCode()).json(response.getJSONData());
    } catch(e) {
      console.log(e);
      res.status(500).json({err: true, msg: 'Something went wrong'});
    }
  })

module.exports = router;
