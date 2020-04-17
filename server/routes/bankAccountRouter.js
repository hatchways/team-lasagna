const express = require("express");
const router = express.Router();
const bankAccountController = require("../controllers/bankAccountController");

router.get("/:id", bankAccountController.getBankAccount);
router.post("/", bankAccountController.addBankAccount);

const stateMatches = (state_parameter) => {
  // Load the same state value that you randomly generated for your OAuth link.
  const saved_state = "ovo-666";

  return saved_state == state_parameter;
};

module.exports = router;
