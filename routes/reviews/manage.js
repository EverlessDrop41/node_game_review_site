var express = require('express');
var router = express.Router();

var reviewModel = require("../../models/review");
var userModel = require("../../models/user");

var script_sanitize = require('script_sanitize').sanitize;

var utils = require("../../utils");

router.get("/", utils.loginUser, function (req, res) {
  if (req.current_user.isAdmin) {
    reviewModel.findAll().then(function(reviews) {
      tParams = req.app.locals.getTemplateParams(req);
      tParams.reviews = reviews;
      res.render('reviews/manage', tParams);
    })
  } else {
    res.status(403).redirect("/");
  }
});

module.exports = router;
