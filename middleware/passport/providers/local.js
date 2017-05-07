const LocalStrategy     = require('passport-local').Strategy;


const passportController = require('./../../../controller/passport');
const auth              = require('./../../../config/auth.json');


module.exports = (passport, userModel) => {
  const strategies = ['local-signup-dev', 'local-signup-nonprofit'];

  for(let i = 0; i < 2; i++) {
    passport.use(strategies[i], new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
    },
      function(req, email, password, done) {
        process.nextTick(function() {
          passportController.passportCreateLocalUser(req, email, password, i, done);
        });
      }
    ));
  };

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
  },
  function(email, password, done) {
    process.nextTick(function() {
      passportController.passportLogInCurrentUser(email, password, done);
    });
  }));
}
