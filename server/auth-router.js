const express = require('express');
const authModel = require('./auth-model');
const asyncHandler = require('./utils');

const router = new express.Router();

const passport = require('passport');

router.post(
    '/',
    asyncHandler(async (req, res) => {
      
      passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);

    }),
);

module.exports = router;
