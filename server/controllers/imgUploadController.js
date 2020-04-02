const upload = require("../services/image-upload");

const uploadSingle = upload.single("image");

module.exports.imgUpload = (req, res, err) => {
  uploadSingle(req, res, err => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err }]
      });
    }
    return res.status(200).json({ imageUrl: req.file.location });
  });
};
