// server/src/models/index.js
const sequelize = require('../config/database');
const User = require('./user.model');
const Application = require('./application.model');

module.exports = { sequelize, User, Application };