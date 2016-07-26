var user = require("./models/user");

var loginURI = "/user/login";

function addDays (date, days) {
  var dat = new Date(this.valueOf());
  dat.setDate(date + days);
  return dat;
}

function nw() {
  var ms = new Date().getTime() + 86400000 * 7;
  return new Date(ms);
}

module.exports = {
  nextweek: nw,
  loginUser:  function(req, res, next) {
    if (req.session && req.session.authToken) {
      user.findOne({
        where: {
          authToken: req.session.authToken
        }
      }).then(function (user) {
        if (user) {

          if(user.authTokenExpiration < new Date()) {
            res.redirect("/user/logout_token_exp");
            return;
          }

          req.current_user = {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          };

          next();
        } else {
          res.redirect(loginURI)
        }
      });
    } else {
      res.redirect(loginURI);
    }
  },
  getUser: function (req, res, next) {
    if (req.session && req.session.authToken) {
      user.findOne({
        where: {
          authToken: req.session.authToken
        }
      }).then(function (user) {
        if (user) {

          if(user.authTokenExpiration < new Date()) {
            res.redirect("/user/logout_token_exp");
            return;
          }

          req.current_user = {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          };

          next();
        } else {
          req.session.authToken = null;
          next()
        }
      });
    } else {
      next();
    }
  }
};