/**
* Last Date Updated: 05.04.17
* @name home/index
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the express router.
**/
const router     = require('express').Router();

router.route('/')
  .get((q, s) => {
    s.status(200).json({err: false, msg: 'Welcome to the Communicode API.'});
  });

module.exports = router;
