var form = require("express-form");
var field = form.field;

var login_form = form(
  field("name").trim().required(),

  field("userId").toInt().required(),

  field("r_content").trim().required(),

  field("rating").toInt().custom(function (val) {
    if (val < 0) { val = 0; }
    if (val > 100) { val = 100; }
    return val
  }).required()
);

module.exports = login_form;