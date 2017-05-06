const router         = require('express').Router();

// Require the TestController
const controller     = require('./../../controller/test');
const userController = require('./../../controller/user');

router.route('/')

  .get((req, res) => {
    const test = controller.index(req, res).next().value;

    test.then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      res.status(500).json({"message": "Couldn't fetch tests"});
    });

  });


router.route('/user')
  .get((req, res) => {

    const user = new userController();

    user.updateUser({_id: '590dfda407ee927c59fb92771'}, {fname: 'Cooper', lname: 'Campbell'}).then((json) => {
      res.status(200).json(json);
    }).catch((errJSON) => {
      res.status(200).json(errJSON);
    });

  });

module.exports = router;
