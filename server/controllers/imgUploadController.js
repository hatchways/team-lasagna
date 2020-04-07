const s3 = require("../services/image-upload");
const Profile = require("../models/Profile");
const uploadSingle = s3.upload.single("image");

module.exports.imgUpload = (req, res, err) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err }],
      });
    }
    const profile = await Profile.findByIdAndUpdate(
      req.params.userId,
      {
        profilePic: req.file.location,
      },
      {
        new: true,
      }
    );
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    return res.status(200).json(profile);
  });
};

module.exports.imgDelete = async (req, res, err) => {
  const profile = await Profile.findById(req.params.userId);
  if (!profile) {
    return res.status(404).json({ msg: "Profile not found" });
  }
  const split = profile.profilePic.split("/");
  const key = decodeURIComponent(split[split.length - 1]);
  s3.delete(key);
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.userId,
    {
      profilePic: "",
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedProfile);
};
