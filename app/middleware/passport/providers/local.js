import LocalStrategy, { Strategy } from 'passport-local';
import controller from './../../../controller/passport';
import auth from './../../../config/auth.json';

export default (passport) => {
  const strategies = ['local-signup-dev', 'local-signup-nonprofit'];
  for(let i = 0; i < 2; i++) {
    passport.use(strategies[i], new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      function(req, email, password, done) {
        process.nextTick(function() {
          controller.passportCreateLocalUser(req, email, password, done);
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
      controller.passportLogInCurrentUser(email, password, done);
    });
  }));
}
