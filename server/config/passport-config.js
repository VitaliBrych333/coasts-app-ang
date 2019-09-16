const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/auth-model');

passport.use(
  new LocalStrategy({ usernameField: 'login', passwordField: 'password' }, (username, password, done) => {

    User.findOne({ login: username }, (err, user) => {
      if (err) {
        return done(err);

      } else if (!user) {
        return done(null, false, { message: 'User name is not registered' });

      } else if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Wrong password.' });

      } else {
        return done(null, user);
      }
    });
  })
);
