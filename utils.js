var user = require("./models/user");

var loginURI = "/user/login";

module.exports = {
  loginUser:  function(req, res, next) {
    if (req.session && req.session.authKey) {
      user.findOne({
        where: {
          authToken: req.session.authKey
        }
      }).then(function (user) {
        if (user) {
          console.log(user.authTokenExpiration);

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
    if (req.session && req.session.authKey) {
      user.findOne({
        where: {
          authToken: req.session.authKey
        }
      }).then(function (user) {
        if (user) {

          req.current_user = {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          };

          next();
        } else {
          req.session.authKey = null;
          next()
        }
      });
    } else {
      next();
    }
  },
  nextweek: function (){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek;
  }
};