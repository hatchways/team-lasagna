const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

//const config = require("../config");

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  accessKeyId: process.env.ACESS_KEY_ID || "",
  region: "us-east-1",
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
  }
};

module.exports.upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "pet-sitter-imgs",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "Meta-data" });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

module.exports.delete = (key) => {
  s3.deleteObject({ Bucket: "pet-sitter-imgs", Key: key }, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      // error
    } else {
      console.log(data); // deleted
    }
  });
};

// module.exports = upload;
