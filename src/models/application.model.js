// server/src/models/application.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Application = sequelize.define('Application', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  position: { type: DataTypes.STRING, allowNull: false },
  resumeUrl: { type: DataTypes.STRING, allowNull: true },
  coverLetter: { type: DataTypes.TEXT, allowNull: true },
  answers: { type: DataTypes.JSONB, allowNull: true }, 
  status: {
    type: DataTypes.ENUM('submitted', 'reviewing', 'shortlisted', 'rejected', 'hired'),
    defaultValue: 'submitted'
  }
}, { timestamps: true });

// Define relationship
Application.belongsTo(User, { foreignKey: 'userId', as: 'candidate' });
User.hasMany(Application, { foreignKey: 'userId', as: 'applications' });

module.exports = Application;