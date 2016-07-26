var express = require('express');
var router = express.Router();

var userRouter = require("./user");
var reviewsRouter = require("./reviews");

router.use('/user', userRouter);
router.use('/reviews', reviewsRouter);

router.get('/', function(req, res){
  res.render('index', res.app.locals.getTemplateParams(req));
});

module.exports = router;
