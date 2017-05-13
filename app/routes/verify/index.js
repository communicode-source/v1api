/**
* Last Date Updated: 05.04.17
* @name verify/index
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the express router, and passport.
**/
const router     = require('express').Router();
const passport   = require('passport');

router.route('/')
  .get((req, res) => {
    res.status(200).json({err: true, msg: 'Must use POST method.'});
  })
  .post((req, res) => {
    res.status(200).json({err: false, token: 'Under construction ATM. You are at the right spot!'});
  })

router.route('/login/:user/:pw')
  .get(passport.authenticate('local-login', {session: false}), function(req, res) {
    res.status(200).json(jwt.generate(user));
  });

module.exports = router;
