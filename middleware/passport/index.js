
const userHandler      = require('./../../db/handler/user');

const facebookStrategy = require('./providers/facebook');
const githubStrategy   = require('./providers/github');
const googleStrategy   = require('./providers/google');
const localStrategy    = require('./providers/local');

module.exports = (passport) => {
  passport.initialize();
  facebookStrategy(passport, userHandler);
  githubStrategy(passport, userHandler);
  googleStrategy(passport, userHandler);
  localStrategy(passport, userHandler);
  return;
}
