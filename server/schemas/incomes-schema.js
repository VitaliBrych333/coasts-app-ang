const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const incomesSchema = new mongoose.Schema({
  date: Types.Date,
  sum: Types.Number,
  who: Types.String,
  type: Types.String,
  other: Types.String,
  author: Types.String,
});

incomesSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  let income = await this.findOne(condition);
  if (!income) {
    income = await this.create(condition);
  }
  return income;
};

module.exports = incomesSchema;