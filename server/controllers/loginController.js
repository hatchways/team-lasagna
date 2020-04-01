const User = require("../models/User");
const jwt = require("jsonwebtoken");
module.exports.authenticateUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.send({ message: "invalid json format" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user){
        return res.status(400).send({msg : "User not found"})
    }
    console.log(user);
  } catch (err) {
    res.status(500).send({ msg: "server error" });
  }
};
