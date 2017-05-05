/**
* Last Date Updated: 05.04.17
* @name jwt/index
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the express router, and the jwt controller.
**/
const controller = require('./../../controller/jwt');
const router     = require('express').Router();
const JWTController = new controller();


router.route('/')
  .get((req, res) => {
    res.status(200).json({msg: 'Welcome to the JWT API.', options: ['/gen', '/decode', '/check']});
  })

router.route('/gen')
  .get((q, s) => {
    s.status(200).json(JWTController.generate({fname: 'Cooper', lname: 'Campbell', id: 'TheLegend', location: q.connection.remoteAddress}));
  })

router.route('/decode/:jwt')
  .get((q, s) => {
    s.status(200).json(JWTController.decode(q.params.jwt));
  })

router.route('/check/:jwt')
  .get((q, s) => {
    s.status(200).json(JWTController.check(q.params.jwt, q));
  })

module.exports = router;
