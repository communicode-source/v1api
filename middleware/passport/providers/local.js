const LocalStrategy     = require('passport-local').Strategy;
const passportController = require('./../../../controller/passport');
const auth              = require('./../../../config/auth.json');


module.exports = (passport) => {
  const strategies = ['local-signup-dev', 'local-signup-nonprofit'];
  for(let i = 0; i < 2; i++) {
    passport.use(strategies[i], new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      function(req, email, password, done) {
        process.nextTick(function() {
          passportController.passportCreateLocalUser(req, email, password, done);
        });
      }
    ));
  };

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    process.nextTick(function() {
      passportController.passportLogInCurrentUser(email, password, done);
    });
  }));
}
