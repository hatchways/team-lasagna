const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  availability: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  }
});

module.exports = Profile = mongoose.model('Profile', profileSchema);