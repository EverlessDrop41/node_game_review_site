var express = require('express');
var router = express.Router();

var reviewModel = require("../../models/review");

var reviewForm = require("../../forms/review/create_review");

router.get('/', function (req, res) {
  res.render('reviews/create', req.app.locals.getTemplateParams(req));
});

router.post('/', reviewForm, function (req, res) {
  if (req.form && req.form.isValid) {
    reviewModel.create({
      gameName: req.form.name,
      reviewerId: req.form.userId,
      content: req.form.r_content,
      rating: req.form.rating
    }).then(function () {
      res.redirect("/");
    });

  }
  else {
    res.render('reviews/create', req.app.locals.getTemplateParams(req));
  }

});

module.exports = router;
