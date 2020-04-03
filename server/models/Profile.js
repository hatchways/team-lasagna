const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: "",
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
    required: true
  },
  gender: {
    type: String,
    trim: true,
    default: ""
  },
  phone: {
    type: String,
    trim: true,
    default: ""
  },
  address: {
    address1: {
      type: String,
      trim: true,
      default: ""
    },
    address2: {
      type: String,
      trim: true,
      default: ""
    },
    city: {
      type: String,
      trim: true,
      default: ""
    },
    province: {
      type: String,
      trim: true,
      default: ""
    },
    zipCode: {
      type: String,
      trim: true,
      default: ""
    },
    country: {
      type: String,
      trim: true,
      default: ""
    }
  },
  birthDate: {
    type: Date
  },
  hourlyRate: {
    type: Number,
    default: 0
  },
  about: {
    type: String,
    trim: true,
    default: ""
  },
  availability: {
    type: [Boolean],
    trim: true,
    default: [0, 0, 0, 0, 0, 0, 0]
  },
  profilePic: {
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

module.exports = Profile = mongoose.model("Profile", profileSchema);
