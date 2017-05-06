// Passport plugin to add the github authentication strategy.
const GithubStrategy    = require('passport-github').Strategy;


const auth              = require('./../../../config/auth.json');

module.exports = (passport, userModel) => {
  passport.use(new GithubStrategy({
    clientID      : auth.github.clientID,
    clientSecret  : auth.github.clientSecret,
    callbackURL   : auth.callbackURL+'github',
    profileFields : ['id', 'emails', 'name']
  }, function(token, refreshToken, profile, done) {
      process.nextTick(() => {
        const user = {
          "fname": profile._json.name.split(" ")[0],
          "lname": profile._json.name.split(" ")[profile._json.name.split(" ").length - 1],
          "provider": "github",
          "id": profile.id,
          "email": profile._json.email
        };

        UserModel.passportFindOrCreate(user, done);
      });
    }));
}
