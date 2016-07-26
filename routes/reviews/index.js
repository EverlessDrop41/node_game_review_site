var express = require('express');
var router = express.Router();

var create = require("./create");

router.use('/create', create);

module.exports = router;
