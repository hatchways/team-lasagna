const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secretKey);

module.exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: req.body.payer,
    line_items: [
      {
        name: "one-time service",
        description: "Loving Sitter pet care",
        // images: ["link"],
        amount: 3000, // 30$
        currency: "cad",
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success/{CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/payment/",
  });
  res.json(session);
};

module.exports.retrieve = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.id);
  if (!session) {
    return res.status(404).json({ msg: "Sessions not found" });
  }
  res.json(session);
};
