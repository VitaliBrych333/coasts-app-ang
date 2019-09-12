const mongoose = require('mongoose');

const { Types } = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
  userName: Types.String,
  // role: Types.String,
  password: Types.String,
});

authSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
    let user = await this.findOne(condition);
    if (!user) {
        user = await this.create(condition);
    }
    return user;
};

auth.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

auth.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}




module.exports = authSchema;
