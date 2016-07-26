var express = require('express');
var router = express.Router();

var create = require("./create");
var manage = require("./manage");
var getRoute = require("./get");

router.use('/create', create);
router.use('/manage', manage);
router.use('/', getRoute);

module.exports = router;
