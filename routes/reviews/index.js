var express = require('express');
var router = express.Router();

var create = require("./create");
var getRoute = require("./get");

router.use('/create', create);
router.use('/', getRoute);

module.exports = router;
