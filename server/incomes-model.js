const mongoose = require('mongoose');

const incomesSchema = require('./incomes-schema');

const incomesModel = mongoose.model('incomes', incomesSchema, 'incomes');

module.exports = incomesModel;
