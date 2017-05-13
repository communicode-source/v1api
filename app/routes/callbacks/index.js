import express, { Router } from 'express';
import passport from 'passport';

const router = express.Router();

/**
* FACEBOOK OAUTH CALLBACKS
**/
router.route('/callback/facebook')
  .get(passport.authenticate('facebook', {
        session: false,
        successRedirect : '/findPath',
        failureRedirect : '/'
    }));

/**
* GITHUB OAUTH CALLBACKS
**/
router.route('/callback/github')
  .get(passport.authenticate('github', {
    session: false,
    successRedirect: '/findPath',
    failureRedirect: '/'
  }));

/**
* GOOGLE OAUTH CALLBACKS
**/
router.route('/callback/google')
  .get(passport.authenticate('google', {
    session: false,
    successRedirect: '/findPath',
    failureRedirect: '/'
  }));

/**
* LOCAL OAUTH CALLBACKS
**/
router.route('/local/register/dev') // Register Route.
  .post(passport.authenticate('local-signup-dev', {
      session: false,
      successRedirect : '/findPath',
      failureRedirect : '/'
  }));
router.route('/local/register/nonprofit') // Register Route.
  .post(passport.authenticate('local-signup-nonprofit', {
      session: false,
      successRedirect : '/findPath',
      failureRedirect : '/'
  }));
router.route('/local/login') // Login Route.
  .post(passport.authenticate('local-login', {
    session: false,
    successRedirect: '/findPath',
    failureRedirect: '/'
  }));


export default router;
