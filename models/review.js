var Sequelize = require('sequelize');
var db = require("../db");
var user = require("./user");

var Review = db.define('review', {
  gameName: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING(10000)
  },
  rating: {
    type: Sequelize.INTEGER(5)
  }
});

Review.belongsTo(user, {as: "reviewer"});

module.exports = Review;