var express = require('express');
var router = express.Router();

var authentication = require("./authentication");

router.get('/login', function (req, res) {
  res.render('auth/login');
});

router.get('/register', function (req, res) {
  res.render('auth/register');
});

module.exports = router;
