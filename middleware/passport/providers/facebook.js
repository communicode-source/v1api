// Passport plugin to add the facebook authentication strategy.
const FacebookStrategy  = require('passport-facebook').Strategy;

const passportController = require('./../../../controller/passport');
const auth              = require('./../../../config/auth.json');

module.exports = (passport, userModel) => {
  passport.use(new FacebookStrategy({
    clientID      : auth.facebook.clientID,
    clientSecret  : auth.facebook.clientSecret,
    callbackURL   : auth.callbackURL+'facebook',
    profileFields : ['id', 'emails', 'name']
  }, function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        const user = {
          "fname": profile._json.first_name,
          "lname": profile._json.last_name,
          "provider": "facebook",
          "id": profile.id,
          "email": profile._json.email
        };

        passportController.passportFindOrCreate(user, done);
      });
    }));
}
