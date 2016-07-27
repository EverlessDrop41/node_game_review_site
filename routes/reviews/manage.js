var express = require('express');
var router = express.Router();

var reviewModel = require("../../models/review");
var reviewForm = require("../../forms/review/create_review");

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

router.get("/edit/:id", utils.loginUser, function(req, res) {
  reviewModel.findById(req.params.id).then(function (review) {
    if (review) {
      var tParams = req.app.locals.getTemplateParams(req);
      tParams.review = review;
      res.render("reviews/edit", tParams);
    }
    else {
      res.redirect("/reviews/manage");
    }
  });
});

router.post("/edit/:id", utils.loginUser, reviewForm, function(req, res) {
  if (req.form && req.form.isValid) {
    reviewModel.findById(req.params.id).then(function (review) {
      review.update({
        gameName: req.form.name,
        reviewerId: req.form.userId,
        content: req.form.r_content,
        rating: req.form.rating
      }).then(function () {
        res.redirect("/reviews/get/" + req.params.id);
      });
    });
  } else {
    res.redirect("/reviews/edit/" + req.params.id);
  }
});

router.get("/delete/:id", utils.loginUser, function(req, res) {
  reviewModel.findById(req.params.id).then(function (review) {
    if (review) {
      review.destroy().then(function () {
        res.redirect("/reviews/manage");
      });
    }
    else {
      res.redirect("/reviews/manage");
    }
  });
});

module.exports = router;
