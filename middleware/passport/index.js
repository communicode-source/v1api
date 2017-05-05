const FacebookStrategy  = require('passport-facebook').Strategy; // Allows for Facebook validation.
const GithubStrategy    = require('passport-github').Strategy; // Allowws for Github validation.
const GoogleStrategy    = require('passport-google-oauth2').Strategy;
const LocalStrategy     = require('passport-local').Strategy; // Allows for custom local validation.
const auth              = require('./../../config/auth.json'); // Super secret sauces.
var User                = require('./../../db/model/user'); // User model.
const t                 = require('./../../db/handler/user');
const UserModel         = new t();

// Initialize with the passport instance to configure passport to run properly.
module.exports = function(passport) {

    // Used to serialize the user for the session.
    passport.serializeUser(function(user, done) {
        done(null, user); // This what will be logged into the session.
    });

    // Used to deserialize the user.
    passport.deserializeUser(function(user, done) {
        done(null, user); // This is what will be unlogged.
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({ // Using the facebook passport startegy to lgo people in.
        clientID        : auth.facebook.clientID, // Kittens.
        clientSecret    : auth.facebook.clientSecret, // Secret sauce.
        callbackURL     : 'http://localhost:3000/oauth/facebook/login/callback', // URls
        profileFields   : ['id', 'emails', 'name'] // Permissions.
    },
      function(token, refreshToken, profile, done){ // Annoying thing that took me forever to figure out how to use.
        process.nextTick(function(){ // Async function.
          var user = {
            "fname": profile._json.first_name,
            "lname": profile._json.last_name,
            "provider": "facebook",
            "id": profile.id,
            "email": profile._json.email
          }
          UserModel.passportFindOrCreate(user, done); // That one function.
        }
        );
      }));
    // =========================================================================
    // GITHUB ==================================================================
    // =========================================================================
    passport.use(new GithubStrategy({
      clientID        : auth.github.clientID, // Meerkat.
      clientSecret    : auth.github.clientSecret, // Secret sauce.
      profileFields   : ['id', 'emails', 'name'] // Permissions.
      },
      function(token, refreshToken, profile, done) { // Annoying thing that took me forever to figure out how to use.
        process.nextTick(function(){ // Async function.
          var user = {
            "fname": profile._json.name.split(" ")[0],
            "lname": profile._json.name.split(" ")[profile._json.name.split(" ").length - 1],
            "provider": "github",
            "id": profile.id,
            "email": profile._json.email
          }
          UserModel.passportFindOrCreate(user, done); // That one function.
        });
      }
    ));
    // =========================================================================
    // Google REGISTRATION =====================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
      clientID      : auth.google.clientID,
      clientSecret  : auth.google.clientSecret,
      callbackURL   : 'http://localhost:3000/oauth/google/login/callback',
      profileFields : ['id', 'emails', 'name']
    },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        var user = {
          "fname": profile.displayName.split(" ")[0],
          "lname": profile.displayName.split(" ")[profile.displayName.split(" ").length - 1],
          "provider": "google",
          "id": profile.id,
          "email": profile.email
        };
        UserModel.passportFindOrCreate(user, done);
      });
    }));
    // =========================================================================
    // LOCAL REGISTRATION ======================================================
    // =========================================================================
    passport.use('local-signup-dev', new LocalStrategy({
      usernameField: 'email', // Changes the default from 'username' to 'email.'
      passReqToCallback: true
    },
      function(req, email, password, done){
        process.nextTick(function() { // Async.
          UserModel.passportCreateLocalUser(req, email, password, 0, done); // That one function.
        });
      }
    ));

    passport.use('local-signup-nonprofit', new LocalStrategy({
      usernameField: 'email', // Changes the default from 'username' to 'email.'
      passReqToCallback: true
    },
      function(req, email, password, done){
        process.nextTick(function() { // Async.
          UserModel.passportCreateLocalUser(req, email, password, 1, done); // That one function.
        });
      }
    ));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
      usernameField: 'email', // Need to specify that the field we want is email, not username.
    },
    function(email, password, done) {
      process.nextTick(function() { // Async.
        UserModel.passportLogInCurrentUser(email, password, done);
      });
    }));
};
