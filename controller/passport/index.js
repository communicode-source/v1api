'use strict'

const userModel       = require('./../../db/model/user');

class Passport {
  constructor() {

  }

  passportFindOrCreate(profile, done) {
    getUser.findOne({ // Sees if user is already in DB.
      'Provider'         : profile.provider,
      'providerID'       : profile.id,
    }, function(err, user) {
      if(err){ // Return if there is an error.
        return done(err, null);
      }

      if(user) { // Return an existing user if there is one.
        return done(null, user);
      } else { // Make that new user.
        let newUser = new getUser({
          email: profile.email,
          providerID: profile.id,
          accountType: false,
          Provider: profile.provider,
          }
        );
        newUser.save(function(err, results, rows) {
          let hID = newUser._id;
          let userA = new userAttr({
            fName: profile.fname,
            lName: profile.lname,
            userId: hID,
            url: null,
            interests: [],
            skills : []
          });
          process.nextTick(()=>{updateUrl(userA);});
          return done(null, newUser);
        });
      }
    });
  }

  passportCreateLocalUser(req, email, password, accountType, done) {
    getUser.findOne({'email': email, 'Provider' : 'local'}, function(err, user) {
      if(err)
        return done(err);
      if(user) {
        return done(null, false);
      } else {
        let newUser = new getUser();
        newUser.Provider = 'local';
        newUser.email = email;
        newUser.accountType = accountType;
        newUser.providerID = null;
        newUser.password = newUser.generateHash(password);
        newUser.save(function(err){
          if(err)
            throw err;
        });
        let hID = newUser._id;
        let userA = new userAttr({
          fName: null,
          lName: null,
          userId: hID,
          url: null,
          interests: [],
          skills: []
        });
        userA.save(function(err) {
          if(err){
            console.log(err)
          }
          return done(null, newUser);
        });
      }
    });
  }

  passportLogInCurrentUser(email, password, done) {
    getUser.findOne({'email': email, 'Provider' : 'local'}, function(err, user) { // Finding the user.
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

module.exports = Passport;
