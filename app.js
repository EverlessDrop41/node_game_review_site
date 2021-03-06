var express = require('express');
var app = express();

var nunjucks = require('nunjucks');

var dateFilter = require('nunjucks-date-filter');

var env = new nunjucks.Environment();

app.set('view engine', 'nunjucks');
var nEnv = nunjucks.configure('templates', {
    autoescape: false,
    noCache: true,
    express: app
});

nEnv.addFilter('date', dateFilter);

nEnv.addFilter('shorten', function(str, count) {
  return str.slice(0, count || 5);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieSession = require('cookie-session');

app.set('trust proxy', 1); // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(express.static('public'));

var config = require("./config");

var db = require("./db");
var review = require("./models/review");
var user = require("./models/user");
review.sync();
user.sync();
db.sync();

app.locals.getTemplateParams = function (req) {
  return {
    app_name: "Video Game Review Site",
    current_user: req.current_user,
    formErrors: req.form ? req.form.getErrors() : undefined
  }
};

//Register routes
var index_route = require("./routes/index");
app.use('/', index_route);

var port = config.port;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});