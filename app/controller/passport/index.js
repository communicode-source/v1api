'use strict'

const userModel       = require('./../../db/model/user');
const userHandler     = require('./../../db/handler/user');


module.exports = {

  passportFindOrCreate(profile, done) {
    userModel.findOne({ // Sees if user is already in DB.
      'provider'         : profile.provider,
      'providerid'       : profile.id,
    }, function(err, user) {
      if(err){ // Return if there is an error.
        return done(err, null);
      }

      if(user) { // Return an existing user if there is one.
        return done(null, user);
      } else { // Make that new user.
        const newUser = new userHandler();
        newUser.createUser({
          email: profile.email,
          providerid: profile.id,
          accounttype: false,
          provider: profile.provider,
          fname: profile.fname,
          lname: profile.lname,
          })
          .then(newUser => {
            return done(null, newUser);
          }).catch(err => {
            console.log(err);
            return done(null, newUser);
          });
      }
    });
  },

  passportCreateLocalUser(req, email, password, done) {
    let dbHandler = new userHandler();
    let user = dbHandler.find({'email': email, 'provider': 'local'});

    user.then(user => {
      if(user)
        return done(null, false);

      const data = {
        provider: 'local',
        email: email,
        accounttype: (req.accounttype) ? req.accounttype : 0,
        providerid: null,
        password: dbHandler.setPassword(password),
      };

      dbHandler.createUser(data).then(newUser => {
        return done(null, newUser);
      }).catch(err => {
        console.log(err);
        return done(err, dbHandler);
      });

    }).catch(err => {
      return done(err);
    });
  },

  passportLogInCurrentUser(email, password, done) {
    userModel.findOne({'email': email, 'provider' : 'local'}, function(err, user) { // Finding the user.
      if(err)
        throw new err;
      if(!user){ // Makes sure the user exists.
        return done(null, false);
      }
      if(!user.validPassword(password)) // Validate password.
        return done(null, false);

      return done(null, user); // Return the user.
    });
  }


}
