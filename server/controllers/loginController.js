const User = require("../models/User");
const bcrypt = require("bcryptjs");
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

//token, oldPassword and new password are sent for this process.
module.exports.updatedPassword = async(req, res) => {
  const {oldPassword, newPassword, userId, token} = req.body
  //console.log(token.token)
  let decoded = jwt.decode(token.token);
  console.log(decoded)
  const email = decoded.email
  //return res.status(200).send({ decoded });
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }
    isMatch = await User.comparePassword(oldPassword, user.password);
    if (isMatch) {
      const hashedpwd = await bcrypt.hash(newPassword, 10);
      const data = {
        password: hashedpwd,
        email: email
      };
      console.log('old password match')
      user.set(data);
      await user.save()
      return res.status(200).send({ msg: "Password update Successful" });
    }
    return res.status(400).send({ msg: "Old password dont match" });
  } catch(error) {
    console.log(error)
    res.status(500).send({ msg: "server error" });
  }  
}