const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  available: {
    type: Boolean,
    default: true,
  },
  firstName: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    default: "",
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  address: {
    address1: {
      type: String,
      trim: true,
      default: "",
    },
    address2: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    province: {
      type: String,
      trim: true,
      default: "",
    },
    zipCode: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
  },
  birthDate: {
    type: Date,
  },
  hourlyRate: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    trim: true,
    default: "",
  },
  availability: {
    type: {},
    trim: true,
    default: {
      sundays: false,
      mondays: false,
      tuesdays: false,
      wednesdays: false,
      thursdays: false,
      friday: false,
      saturdays: false,
    },
  },
  profilePic: {
    type: String,
    trim: true,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  accountId: {
    type: String,
    default: "",
  },
  customerId: {
    type: String,
    default: "",
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
