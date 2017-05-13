import express, { Router } from 'express';
import passport from 'passport';

// Require the TestController
import controller from './../../controller/test';

const router = express.Router();

router.route('/')

  .get( async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.status).json(response.data);
  });


router.route('/user/make')
    .post(passport.authenticate('local-signup-dev', {
        session: false
    }), (req, res, next) => {
      res.status(200).json({"Message": "Created User Successfully"});
    });


module.exports = router;
