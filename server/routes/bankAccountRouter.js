const express = require("express");
const router = express.Router();
const bankAccountController = require("../controllers/bankAccountController");

router.post("/get", bankAccountController.getBankAccount);
router.post("/", bankAccountController.addBankAccount);

module.exports = router;
