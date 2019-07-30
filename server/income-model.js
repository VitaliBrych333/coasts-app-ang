const mongoose = require('mongoose');

const incomeSchema = require('./income-schema');

const incomeModel = mongoose.model('income', incomeSchema, 'income');

module.exports = incomeModel;
