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
    let coast = await this.findOne(condition);
    if (!coast) {
        coast = await this.create(condition);
    }
    return coast;
};
module.exports = coastsSchema;
