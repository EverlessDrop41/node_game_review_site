var express = require('express');
var router = express.Router();

var authentication = require("./authentication");

router.use('/', authentication);

module.exports = router;
