const express = require('express');
const User = require('../models/auth-model');
const asyncHandler = require('../handleMiddleware/utils');

const router = new express.Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let user = new User();
    user.login = req.body.login;
    user.password = req.body.password;

    const userDB = await User.find({login: user.login}).exec();

    if (userDB.length !== 0) {
      res.status(422).send(['Duplicate login found.']);

    } else {
      user.save((err, doc) => {

        if (!err) {
          res.send(doc);

        } else {
          return next(err);
        }
      });
    }
  })
);

module.exports = router;
