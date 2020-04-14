const { check } = require("express-validator");

const validate = [
  check("firstName")
    .exists()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name is required"),
  check("lastName")
    .exists()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name is required"),
  check("phone")
    .optional()
    .if((value, { req }) => req.body.phone)
    .custom(value => {
      // false if does not pass
      // simple validation for length and 10 digits or empty string
      return (value.length === 10 && value.match(/^\d{10}$/)) || value === "";
    })
    .withMessage("Must have 10 digits"),
  // check("availability")
  //   .optional()
  //   .if((value, { req }) => req.body.availability)
  //   .isArray({ min: 7, max: 7 })
  //   .withMessage("Invalid availability")
];

module.exports = validate;
