const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CONFIG = require('../config/config');

const authSchema = new mongoose.Schema({
  login: Types.String,
  password: Types.String,
});

authSchema.pre('save', (next) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

authSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  let user = await this.findOne(condition);
  if (!user) {
    user = await this.create(condition);
  }
  return user;
};

authSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

authSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id, login: this.login, password: this.password},
    CONFIG.SECRET_CODE, { expiresIn: CONFIG.TIME_TOKEN });
}

module.exports = authSchema;
