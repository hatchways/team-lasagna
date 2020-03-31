const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("password").isLength({ min: 6 }),
    check("email")
      .isEmail()
      .withMessage("not a valid email")
      .normalizeEmail()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.send({ message: "invalid submission", errors: errors });
    }
    const email = req.body.email;
    const password = req.body.password;
  }
);

module.exports = router;
