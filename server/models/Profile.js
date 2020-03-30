const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    default: ""
  },
  gender: {
    trim: true,
    type: String,
    default: ""
  },
  birthDate: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  availability: {
    type: String,
    trim: true,
    default: ""
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  }
});

module.exports = Profile = mongoose.model('Profile', profileSchema);