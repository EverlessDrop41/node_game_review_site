var Sequelize = require('Sequelize');

var db = new Sequelize('video_game_review_db', 'dev', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

db.authenticate().then(function(err) {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = db;