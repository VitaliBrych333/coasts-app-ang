const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('./auth-model');

passport.use(
    new LocalStrategy({ usernameField: 'login', passwordField: 'password' },
        (username, password, done) => {
           console.log('ddd', username)
           console.log('dd password', password)
           console.log("USER", User)
            User.findOne({ userName: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'User name is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);
