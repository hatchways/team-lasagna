const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkoutController");

router.post("/", checkoutController.checkout);
router.get("/retrieve/:id", checkoutController.retrieve);

module.exports = router;
