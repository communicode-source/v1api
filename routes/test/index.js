const controller = require('./../../controller/test');
const router     = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.status(200).json(controller());
  })


module.exports = router;
