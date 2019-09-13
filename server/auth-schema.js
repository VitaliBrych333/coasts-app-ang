const mongoose = require('mongoose');

const { Types } = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
  login: Types.String,
  // role: Types.String,
  password: Types.String,
});

// authSchema.pre('save', function (next) {
//   bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(this.password, salt, (err, hash) => {
//           this.password = hash;
//           this.saltSecret = salt;
//           next();
//       });
//   });
// });


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
  return jwt.sign({ _id: this._id},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}




module.exports = authSchema;
