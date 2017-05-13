// Passport plugin to add the facebook authentication strategy.
import FacebookStrategy, { Strategy } from 'passport-facebook';

import controller from './../../../controller/passport';
import auth from './../../../config/auth.json';

export default (passport, userModel) => {
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

        controller.passportFindOrCreate(user, done);
      });
    }));
}
