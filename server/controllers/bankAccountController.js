const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secretKey);
const Profile = require("../models/Profile");

module.exports.addBankAccount = async (req, res) => {
  const { code, state, profile_id } = req.body;

  // Assert the state matches the state you provided in the OAuth link (optional).
  if (!stateMatches(state)) {
    return res.status(403).json({ error: "Incorrect state parameter" });
  }
  try {
    // Send the authorization code to Stripe's API.
    let profile = await Profile.findById(profile_id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });
    const connected_account_id = response.stripe_user_id;
    profile = await Profile.findByIdAndUpdate(
      profile_id,
      {
        accountId: connected_account_id,
      },
      {
        new: true,
      }
    );

    // return data
    return res
      .status(200)
      .json({ success: true, resp: response, profile: profile });
  } catch (err) {
    if (err.type === "StripeInvalidGrantError") {
      return res
        .status(400)
        .json({ error: "Invalid authorization code: " + code });
    } else {
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

module.exports.getBankAccount = async (req, res) => {
  const id = req.body.id;
  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    const response = await stripe.accounts.retrieve(profile.accountId);
    if (!response) {
      return res.status(404).json({ msg: "Account not found" });
    }

    // return data
    return res
      .status(200)
      .json({ success: true, account: response, state: "vw8hk6swzmd" });
  } catch (err) {
    if (err.type === "StripeInvalidGrantError") {
      return res
        .status(400)
        .json({ error: "Invalid authorization code: " + code });
    } else {
      return res.status(500).json({ error: err });
    }
  }
};

const stateMatches = (state_parameter) => {
  // Load the same state value that you randomly generated for your OAuth link.
  const saved_state = "vw8hk6swzmd";
  return saved_state == state_parameter;
};
