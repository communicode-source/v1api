const controller = require('./../../controller/jwt');
const router     = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.status(200).json({msg: 'Welcome to the JWT API.', options: ['/gen', '/decode', '/check']});
  })

router.route('/gen')
  .get((q, s) => {
    s.status(200).json(controller.generate({fname: 'Cooper', lname: 'Campbell', id: 'TheLegend'}));
  })

router.route('/decode/:jwt')
  .get((q, s) => {
    s.status(200).json(controller.decode(q.params.jwt));
  })

router.route('/check/:jwt')
  .get((q, s) => {
    s.status(200).json(controller.check(q.params.jwt));
  })

module.exports = router;
