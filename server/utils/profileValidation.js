const { check } = require("express-validator");

const validate = [
  check("phone")
    .optional()
    .custom(value => {
      // false if does not pass
      // simple validation for langth and 10 digits or empty string
      if ((value.length === 10 && value.match(/^\d{10}$/)) || value === "") {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Must have 10 digits"),
  check("availability")
    .optional()
    .isArray({ min: 7, max: 7 })
];

module.exports = validate;
