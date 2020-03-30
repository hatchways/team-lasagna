const Profile = require("../models/Profile");

module.exports.getProfileList = async (req, res, next) => {
  const profiles = await Profile.find();
  console.log(profiles);
  if (!profiles) {
    return res.status(404).json({ err: "No profiles founds" });
  }
  res.status(200).json(profiles);
};

module.exports.getProfileById = async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) {
    return res.status(404).json({ msg: "Profile not found" });
  }
  res.status(200).json(profile);
};

module.exports.updateProfile = async (req, res, next) => {
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.params.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!updatedProfile) {
    return res.status(404).json({ msg: "Profile not found" });
  }
  res.status(200).json({ updatedProfile, msg: "Successfully updated profile" });
};

module.exports.createProfile = async (req, res, next) => {
  const newProfile = await Profile.create(req.body);
  res.status(200).json({ newProfile, msg: "Profile created successfully" });
};
