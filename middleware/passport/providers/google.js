// Passport plugin to add the google authentication strategy.
const GoogleStrategy    = require('passport-google-oauth2').Strategy;

const passportController = require('./../../../controller/passport');
const auth              = require('./../../../config/auth.json');

module.exports = (passport, userModel) => {
  passport.use(new GoogleStrategy({
    clientID      : auth.google.clientID,
    clientSecret  : auth.google.clientSecret,
    callbackURL   : auth.callbackUrl+'google',
    profileFields : ['id', 'emails', 'name']
  }, function(token, refreshToken, profile, done) {
      process.nextTick(() => {
        const user = {
          "fname": profile.displayName.split(" ")[0],
          "lname": profile.displayName.split(" ")[profile.displayName.split(" ").length - 1],
          "provider": "google",
          "id": profile.id,
          "email": profile.email
        };

        passportController.passportFindOrCreate(user, done);
      });
    }));
}
