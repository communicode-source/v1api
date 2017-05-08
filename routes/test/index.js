const router         = require('express').Router();
const passport       = require('passport');

// Require the TestController
const controller     = require('./../../controller/test');
const userController = require('./../../controller/user');
const userHandler    = require('./../../db/handler/user');


router.route('/')

  .get((req, res) => {
    const test = controller.index(req, res).next().value;

    test.then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      res.status(500).json({"message": "Couldn't fetch tests"});
    });

  });


router.route('/user/update')
  .post((req, res) => {

    const user = new userController();

    user.updateUser({_id: '590e9217244bee4765736b82'}, {fname: 'Cooper', lname: 'Campbell'}).then((json) => {
      res.status(200).json(json);
    }).catch((errJSON) => {
      res.status(500).json(errJSON);
    });

  });

  router.route('/user/make')
      .post(passport.authenticate('local-signup-dev', {
          session: false
      }), function(req, res, next) {
        res.status(200).json({"Message": "Created User Successfully"});
      });
      // const user = new userHandler();
      // const data = {
      //   provider: 'local',
      //   email: req.body.email,
      //   password: req.body.email
      // }
      // user.createUser({email: 'cooper.campbell104@gmail.com', provider: 'local'}).then(newUser => {
      //   res.status(200).json(newUser);
      //   user.cleanup(true);
      // }).catch(error => {
      //   res.status(500).json({err: true, name: err.name, msg: err.message});
      //   user.cleanup(true);
      // });


module.exports = router;
