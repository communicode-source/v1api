const controller = require('./../../controller/test');
const router     = require('express').Router();

router.route('/')

  .get((req, res) => {
    let test = controller.index(req, res).next().value;

    test.then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      res.status(500).json({"message": "Couldn't fetch tests"});
    });

  });

module.exports = router;
