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
  async (req, res) => {
    const errors = validationResult(req);
    //check validators
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(400)
        .send({ message: "invalid submission", errors: errors });
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
      //
      const hashedpwd = await bcrypt.hash(password, 10);
      const user = new User({
        email: email,
        password: hashedpwd
      });
      const newUser = await user.save();
      return res.status(200).send(newUser);
    } catch (err) {
      console.log(err);
      if (err.code == 11000) {
        return res.send({
          status: 500,
          message: "User already registerd",
          err: err
        });
      }
      res.status(400).send(err);
    }
  }
);

module.exports = router;
