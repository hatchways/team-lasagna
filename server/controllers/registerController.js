const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  //check validators
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).send({ msg: "Invalid submission", errors: errors });
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    //hash password and save to mongodb
    const hashedpwd = await bcrypt.hash(password, 10);
    const user = new User({
      email: email.toLowerCase(),
      password: hashedpwd
    });
    const newUser = await user.save();
    return res.status(200).send(newUser);
  } catch (err) {
    console.log(err);
    if (err.code == 11000) {
      // user already exists
      return res.status(400).send({
        msg: "Email already registered"
      });
    }
    return res.status(500).send(err);
  }
};
