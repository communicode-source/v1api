const controller = require('./../../controller/test');
const router     = require('express').Router();

router.route('/')
  .get((req, res) => {
    controller.returnTestData().then((results) => {
      res.status(200).json(results);
    })
  })


module.exports = router;
