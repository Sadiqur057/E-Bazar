const { Payment } = require("../models/Payment");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    if (!price) return res.status(400).json({ message: "Price is required" });

    const amount = Math.round(price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const payment = new Payment({
      amount,
      currency: "usd",
      clientSecret: paymentIntent.client_secret,
    });
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};

module.exports = { createPaymentIntent };
