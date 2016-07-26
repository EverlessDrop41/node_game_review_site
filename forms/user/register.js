var form = require("express-form");
var field = form.field;

var register_form = form(
  field("username").trim().required(null, "A username is required").is(/^.{4,}$/, "A username must be at least 4 characters"),

  field("password").trim().required().regex(/^(?=.*[A-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
    "Passwords must be at least 8 characters, include a letter, a number and a special character"),

  field("confirm_password", "Confirm Password")
    .required().trim().equals("field::password", "Passwords do not match"),

  field("email").trim().required().isEmail()
);

module.exports = register_form;