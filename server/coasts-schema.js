const mongoose = require('mongoose');

const { Types } = mongoose.Schema;

const coastsSchema = new mongoose.Schema({
  date: Types.Date,
  price: Types.Number,
  type: Types.String,
  other: Types.String,
  author: Types.String,
});

coastsSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
    let user = await this.findOne(condition);
    if (!user) {
        user = await this.create(condition);
    }
    return user;
};
module.exports = coastsSchema;
