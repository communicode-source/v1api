const router     = require('express').Router();

router.route('/')
  .get((q, s) => {
    s.status(200).json({err: false, msg: 'Welcome to the Communicode API.'});
  });

module.exports = router;
