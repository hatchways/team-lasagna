const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
 
module.exports = mongoose.model("Users", userSchema);

module.exports.comparePassword = async (candidatePassword, hash) => {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, hash);
    return isMatch;
  } catch (err) {
      console.log(err)
      return err
  }
};
