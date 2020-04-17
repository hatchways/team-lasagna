const express = require("express");
const router = express.Router();
const bankAccountController = require("../controllers/bankAccountController");

router.get("/:id", bankAccountController.getBankAccount);
router.post("/", bankAccountController.addBankAccount);

module.exports = router;
