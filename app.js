var express = require('express');
var app = express();

var nunjucks = require('nunjucks');

app.set('view engine', 'nunjucks');
var nEnv = nunjucks.configure('templates', {
    autoescape: true,
    noCache: true,
    express: app
});

app.use(express.static('public'));

var IsProd = process.env.IS_PRODUCTION || false;
var IsDev = !IsProd;

var db = require("./db");
var review = require("./models/review");
var user = require("./models/user");
review.sync({force: IsDev});
user.sync({force: IsDev});
db.sync();

//Register routes
var index_route = require("./routes/index");
app.use('/', index_route);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
