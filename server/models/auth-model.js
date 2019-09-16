const mongoose = require('mongoose');
const authSchema = require('../schemas/auth-schema');

const authModel = mongoose.model('auth', authSchema, 'users');

module.exports = authModel;
