
const facebookStrategy = require('./providers/facebook');
const githubStrategy   = require('./providers/github');
const googleStrategy   = require('./providers/google');
const localStrategy    = require('./providers/local');

module.exports = (passport) => {
  facebookStrategy(passport);
  githubStrategy(passport);
  googleStrategy(passport);
  localStrategy(passport);
  return;
}
