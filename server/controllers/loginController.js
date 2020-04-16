const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.authenticateUser = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  if (!email || !password) {
    return res.send({ msg: "Email and password cannot be empty-" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ msg: "Email not found" });
    }
    isMatch = await User.comparePassword(password, user.password);
    if (isMatch) {
      const token = jwt.sign(user.toJSON(), process.env.SECRET, {
        expiresIn: process.env.TOKEN_TIMEOUT,
      });
      return res.status(200).send({ token: token });
    }
    return res.status(400).send({ msg: "Email and password dont match" });
  } catch (err) {
    res.status(500).send({ msg: "server error" });
  }
};
