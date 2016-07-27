var Sequelize = require('sequelize');

var db = new Sequelize('video_game_review_db', config.db_username, config.db_password, {
  host: config.db_host,
  dialect: config.db_dialect
});

db.authenticate().then(function(err) {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = db;
