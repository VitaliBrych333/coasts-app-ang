const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CONFIG = require('../config/config');

const authSchema = new mongoose.Schema({
  login: Types.String,
  password: Types.String,
});

authSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          user.password = hash;
          next();
      });
  });
});

authSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

authSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id, login: this.login, password: this.password},
    CONFIG.SECRET_CODE, { expiresIn: CONFIG.TIME_TOKEN });
}

module.exports = authSchema;
