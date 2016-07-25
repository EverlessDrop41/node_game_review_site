var express = require('express');
var router = express.Router();

var userRouter = require("./user");

router.use('/user', userRouter);

router.get('/', function(req, res){
  res.render('index');
});

module.exports = router;
