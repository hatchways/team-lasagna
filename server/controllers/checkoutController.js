const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secretKey);

module.exports.checkout = async (req, res) => {
  const { account_id, customer_id, amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // customer: customer_id,
    line_items: [
      {
        name: "one-time service",
        description: "Loving Sitter pet care",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTASpruZKdi9GS1SJnCzdVoPFoU0mkymYTwV9k9e6bSc2_mPC7z&usqp=CAU",
        ],
        amount: amount, // 30$
        currency: "cad",
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: amount * 0.2,
      transfer_data: {
        destination: account_id,
      },
    },
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

module.exports.charge = async (req, res) => {
  const { account_id, customer_id, amount } = req.body;
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: amount,
      currency: "cad",
      customer: customer_id,
      description: "Loving Sitter pet care one-time service",
      application_fee_amount: amount * 0.2,
      transfer_data: {
        destination: account_id,
      },
    });

    // Complete the payment using a test card.
    paymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
      // change payment method
      payment_method: "pm_card_mastercard",
    });
  } catch (err) {
    return res.status(403).json(err);
  }
  res.status(200).json({ success: "true", paymentIntent });
};
