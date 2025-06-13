const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // This file stores your data
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  mood: DataTypes.STRING
});

sequelize.sync(); // Creates the table if it doesn't exist

module.exports = { sequelize, User };
