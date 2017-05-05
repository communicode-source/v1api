const router   = require('express').Router();
const passport = require('passport');


/**
* FACEBOOK OAUTH CALLBACKS
**/
router.route('/callback/facebook')
  .get(passport.authenticate('facebook', {
        successRedirect : '/findPath',
        failureRedirect : '/'
    }));

/**
* GITHUB OAUTH CALLBACKS
**/
router.route('/callback/github')
  .get(passport.authenticate('github', {
    successRedirect: '/findPath',
    failureRedirect: '/'
  }));

/**
* GOOGLE OAUTH CALLBACKS
**/
router.route('/callback/google')
  .get(passport.authenticate('google', {
    successRedirect: '/findPath',
    failureRedirect: '/'
  }));

/**
* LOCAL OAUTH CALLBACKS
**/
router.route('/local/register/dev') // Register Route.
  .post(passport.authenticate('local-signup-dev', {
      successRedirect : '/findPath',
      failureRedirect : '/'
  }));
router.route('/local/register/nonprofit') // Register Route.
  .post(passport.authenticate('local-signup-nonprofit', {
      successRedirect : '/findPath',
      failureRedirect : '/'
  }));
router.route('/local/login') // Login Route.
  .post(passport.authenticate('local-login', {
    successRedirect: '/findPath',
    failureRedirect: '/'
  }));


module.exports = router;
