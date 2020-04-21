const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secretKey);
const Profile = require("../models/Profile");

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

module.exports.addPaymentMethod = async (req, res) => {
  const { payment_method_id, profile_id } = req.body;
  let profile;
  try {
    profile = await Profile.findById(profile_id).populate({
      path: "user",
      select: "email",
    });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    if (profile.customerId === "") {
      const customer = await stripe.customers.create({
        email: profile.user.email,
        name: profile.firstName + " " + profile.lastName,
      });
      profile = await Profile.findByIdAndUpdate(
        profile_id,
        {
          customerId: customer.id,
        },
        {
          new: true,
        }
      );
    }
    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      {
        customer: profile.customerId,
      }
    );
    return res.status(200).json({ success: true, profile, paymentMethod });
  } catch (err) {
    return res.status(403).json(err);
  }
};

module.exports.getPaymentMethod = async (req, res) => {
  let profile;
  try {
    profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    if (profile.customerId === "") {
      return res.status(204);
    }
    const paymentMethods = await stripe.paymentMethods.list({
      customer: profile.customerId,
      type: "card",
    });
    return res.status(200).json({ pm: paymentMethods.data, profile });
  } catch (err) {
    return res.status(403).json(err);
  }
};
