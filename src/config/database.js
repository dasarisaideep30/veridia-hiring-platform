// server/src/config/database.js - Now configured for SQLite
const { Sequelize } = require('sequelize');

// Create Sequelize instance using SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite', // This file will be created in your server/ directory
  logging: false, 
});

module.exports = sequelize;