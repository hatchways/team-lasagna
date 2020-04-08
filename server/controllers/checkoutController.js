const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secretKey);

module.exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "one-time service",
        description: "pet sitting service",
        // images: ["link"],
        amount: 3000, // 30$
        currency: "cad",
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success/{CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/cancel/",
  });
  res.json(session);
};
