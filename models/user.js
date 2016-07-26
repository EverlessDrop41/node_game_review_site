var Sequelize = require('Sequelize');
var db = require("../db");

var User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = User;