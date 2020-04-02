const upload = require("../services/image-upload");
const Profile = require("../models/Profile");
const uploadSingle = upload.single("image");

module.exports.imgUpload = (req, res, err) => {
  uploadSingle(req, res, async err => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err }]
      });
    }
    const profile = await Profile.findByIdAndUpdate(
      req.params.userId,
      {
        profilePic: req.file.location
      },
      {
        new: true
      }
    );
    return res.status(200).json(profile);
  });
};
