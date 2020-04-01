const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    //declare validators
    check("password")
      .isLength({ min: 6 })
      .withMessage("minimum 6 characters"),
    check("email")
      .isEmail()
      .withMessage("not a valid email")
      .normalizeEmail()
  ],
  registerController.registerUser
);

module.exports = router;
