const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
router.post("/", loginController.authenticateUser);
router.post("/updatePassword", loginController.updatedPassword)

module.exports = router;
