// Passport plugin to add the google authentication strategy.
import GoogleStrategy, { Strategy } from 'passport-google-oauth2';

import controller from './../../../controller/passport';
import auth from './../../../config/auth.json';

export default (passport, userModel) => {
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

        controller.passportFindOrCreate(user, done);
      });
    }));
}
