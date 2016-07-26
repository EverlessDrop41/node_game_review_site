var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var form = require("express-form");
var field = form.field;

var loginForm = require("../../forms/user/login");
var registerForm = require("../../forms/user/register");

var utils = require("../../utils");

var user = require("../../models/user");

const saltRounds = 10;

router.all('/logout', utils.getUser, function (req, res) {
  req.session.authToken = null;
  user.findById(req.current_user.id).then(function (user) {
    if (user) {
      user.authTokenExpiration = null;
      user.save().then(function () {
        res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  });
});

router.all('/logout_token_exp', utils.getUser, function (req, res) {
  req.session.authToken = null;
  user.findById(req.current_user.id).then(function (user) {
    if (user) {
      user.authTokenExpiration = null;
      user.save().then(function () {
        res.redirect("/user/login");
      });
    } else {
      res.redirect("/user/login");
    }
  });
});

router.get('/login', function (req, res) {
  res.render('auth/login', res.app.locals.getTemplateParams(req));
});

router.post('/login', loginForm, function(req, res) {
  if (req.form && req.form.isValid) {

    user.findOne({
      where: {email: req.body.email}
    }).then(function (user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, match) {
          if (match) {
            if (req.session == null) req.session = {};

            user.authToken = bcrypt.hashSync(req.body.username + req.body.password, 5);
            user.authTokenExpiration = utils.nextweek();

            req.session.authToken = user.authToken;

            user.save().then(function () {
              res.redirect('/');
            });
          } else {
            var tParams = req.app.locals.getTemplateParams(req);
            tParams.formErrors.password = "Incorrect Username/Password";
            res.render('auth/login', tParams);
          }
        });
      } else {
        var tParams = req.app.locals.getTemplateParams(req);
        tParams.formErrors.password = "Incorrect Username/Password";
        res.render('auth/login', tParams);
      }
    });

  } else {
    res.render('auth/login', req.app.locals.getTemplateParams(req));
  }
});

router.get('/register', function (req, res) {
  res.render('auth/register', res.app.locals.getTemplateParams(req));
});

router.post('/register', registerForm, function(req, res) {
  if (req.form && req.form.isValid) {

    bcrypt.hash(req.form.password, saltRounds, function(err, hash) {
      if (!err) {
        user.findOrCreate({
          where: {
            $or: [{ email: req.body.email},
              { username: req.body.username }]
          },
          defaults: {
            password: hash,
            username: req.body.username,
            email: req.body.email
          }
        }).spread(function (user, created) {
          if (created) {
            res.redirect('/login');
          } else {
            var isUniqueUsername = !(user.username == req.body.username);
            var isUniqueEmail = !(user.email == req.body.email);

            var tParams = req.app.locals.getTemplateParams(req);
            tParams.formErrors.username = !isUniqueUsername ? ["Username is already taken"] : undefined;
            tParams.formErrors.email = !isUniqueEmail ? ["Email is already taken"] : undefined;
            res.render('auth/register', tParams);
          }
        });

      } else {
        res.send(err);
      }

    });
  } else {
    res.render('auth/register', req.app.locals.getTemplateParams(req));
  }
});

module.exports = router;
