var express = require('express');
var router = express.Router();

var reviewModel = require("../../models/review");
var userModel = require("../../models/user");

var script_sanitize = require('script_sanitize').sanitize;

router.get('/get', function(req, res) {res.redirect('/reviews')});

router.get('/', function (req, res) {
  reviewModel.findAll({include:[{ model: userModel, as: "reviewer" }]})
    .then(function(reviews) {
      tParams = req.app.locals.getTemplateParams(req);
      tParams.reviews = reviews;
      res.render('reviews/index', tParams);
    })
});

router.get('/get/:id', function (req, res) {

  reviewModel.findAll({
    where: {
      id: req.params.id
    },
    include:[{ model: userModel, as: "reviewer" }]
  }).then(function (reviews) {
    r = reviews[0];
    var tParams = req.app.locals.getTemplateParams(req);
    if (r && r.content) {
      r.content = script_sanitize(r.content);
    }
      tParams.review = r;
      res.render("reviews/view", tParams);


  });
});

module.exports = router;
