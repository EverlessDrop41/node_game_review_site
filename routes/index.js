var express = require('express');
var router = express.Router();

var userRouter = require("./user");
var reviewsRouter = require("./reviews");

var utils = require("../utils");

router.use('/user', userRouter);
router.use('/reviews', reviewsRouter);

router.get('/', utils.getUser, function(req, res){
  res.render('index', res.app.locals.getTemplateParams(req));
});

module.exports = router;
