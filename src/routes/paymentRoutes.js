const express = require("express");

const { createPaymentIntent } = require("../controllers/paymentController.js");

const router = express.Router();

router.post("/create-payment", createPaymentIntent);

module.exports = router;
