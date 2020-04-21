const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/paymentController");

router.post("/", checkoutController.checkout);
router.get("/retrieve/:id", checkoutController.retrieve);
router.post("/charge", checkoutController.charge);
router.post("/method/add", checkoutController.addPaymentMethod);
router.get("/method/:id", checkoutController.getPaymentMethod);

module.exports = router;
