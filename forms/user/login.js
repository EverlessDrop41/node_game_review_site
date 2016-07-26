var form = require("express-form");
var field = form.field;

var login_form = form(
  field("email").trim().required().isEmail(),
  field("password").trim().required().regex(/^(?=.*[A-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
    "Passwords must be at least 8 characters, include a letter, a number and a special character")
);

module.exports = login_form;