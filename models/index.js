const Sequelize = require('sequelize');
require('dotenv').config();

// Initialize Sequelize connection
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

// Import models
const User = require('./User');
const Post = require('./Post');

// Define associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = {
  sequelize,
  User,
  Post
};