const Profile = require("../models/Profile");
const { validationResult } = require("express-validator");

module.exports.getProfileList = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    if (!profiles) {
      return res.status(404).json({ err: "No profiles founds" });
    }
    res.status(200).json(profiles);
  } catch (err) {
    res.status(400).json("Unable to retreive profiles");
  }
};

module.exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json("Unable to retreive profile");
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: {
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      province: req.body.province,
      zipCode: req.body.zipCode,
      country: req.body.country
    },
    availability: req.body.availability,
    profilePic: req.body.profilePic,
    about: req.body.about,
    user: req.body.user
  };
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
    if (!updatedProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res
      .status(200)
      .json({ updatedProfile, msg: "Successfully updated profile" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.createProfile = async (req, res, next) => {
  const errors = validationResult(req);
  //check validators
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).send({ msg: "Invalid submission", errors });
  }
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: {
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      province: req.body.province,
      zipCode: req.body.zipCode,
      country: req.body.country
    },
    availability: req.body.availability,
    profilePic: req.body.profilePic,
    about: req.body.about,
    user: req.body.user
  };
  try {
    const newProfile = await Profile.create(data);
    res.status(200).json({ newProfile, msg: "Profile created successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};
