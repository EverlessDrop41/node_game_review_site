var Sequelize = require('Sequelize');
var db = require("../db");

var Review = db.define('review', {
  gameName: {
    type: Sequelize.STRING
  },
  reviewerName: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER(5)
  }
});

module.exports = Review;