var form = require("express-form");
var field = form.field;

var register_form = form(
  field("username").trim().required().is(/^[a-z]+$/),
  field("password").trim().required().regex(/^(?=.*[A-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
    "Passwords must be at least 8 characters, include a letter, a number and a special character"),
  field("password_confirmation", "Confirm Password").required().trim().equals("field::password"),
  field("email").trim().required().isEmail()
);

module.exports = register_form;