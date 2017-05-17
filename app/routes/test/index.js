import express, { Router } from 'express';
import passport from 'passport';

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


module.exports = router;
