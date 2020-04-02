const { check } = require("express-validator");

const validate = [
  check("firstName")
    .exists()
    .matches(/^[a-zA-Z]+$/),
  check("lastName")
    .exists()
    .matches(/^[a-zA-Z]+$/),
  check("phone")
    .optional()
    .custom(value => {
      // false if does not pass
      // simple validation for length and 10 digits or empty string
      return (value.length === 10 && value.match(/^\d{10}$/)) || value === "";
    })
];

module.exports = validate;
