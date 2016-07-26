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
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  authToken: {
    type: Sequelize.STRING(60)
  },
  authTokenExpiration: {
    type: Sequelize.DATE
  }
});

module.exports = User;