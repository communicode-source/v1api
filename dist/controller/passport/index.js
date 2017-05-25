'use strict';

var userModel = require('./../../db/model/user');
var userHandler = require('./../../db/handler/user');

module.exports = {
  passportFindOrCreate: function passportFindOrCreate(profile, done) {
    userModel.findOne({ // Sees if user is already in DB.
      'provider': profile.provider,
      'providerid': profile.id
    }, function (err, user) {
      if (err) {
        // Return if there is an error.
        return done(err, null);
      }

      if (user) {
        // Return an existing user if there is one.
        return done(null, user);
      } else {
        // Make that new user.
        var newUser = new userHandler();
        newUser.createUser({
          email: profile.email,
          providerid: profile.id,
          accounttype: false,
          provider: profile.provider,
          fname: profile.fname,
          lname: profile.lname
        }).then(function (newUser) {
          return done(null, newUser);
        }).catch(function (err) {
          console.log(err);
          return done(null, newUser);
        });
      }
    });
  },
  passportCreateLocalUser: function passportCreateLocalUser(req, email, password, done) {
    var dbHandler = new userHandler();
    var user = dbHandler.find({ 'email': email, 'provider': 'local' });

    user.then(function (user) {
      if (user) return done(null, false);

      var data = {
        provider: 'local',
        email: email,
        accounttype: req.accounttype ? req.accounttype : 0,
        providerid: null,
        password: dbHandler.setPassword(password)
      };

      dbHandler.createUser(data).then(function (newUser) {
        return done(null, newUser);
      }).catch(function (err) {
        console.log(err);
        return done(err, dbHandler);
      });
    }).catch(function (err) {
      return done(err);
    });
  },
  passportLogInCurrentUser: function passportLogInCurrentUser(email, password, done) {
    userModel.findOne({ 'email': email, 'provider': 'local' }, function (err, user) {
      // Finding the user.
      if (err) throw new err();
      if (!user) {
        // Makes sure the user exists.
        return done(null, false);
      }
      if (!user.validPassword(password)) // Validate password.
        return done(null, false);

      return done(null, user); // Return the user.
    });
  }
};
//# sourceMappingURL=index.js.map