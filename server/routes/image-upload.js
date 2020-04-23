const express = require("express");
const router = express.Router();

const imgUploadController = require("../controllers/imgUploadController");
const aboutImgController = require("../controllers/aboutImgController");

router.post("/:userId", imgUploadController.imgUpload);
router.delete("/:userId", imgUploadController.imgDelete);
router.put("/about-me/:userId", aboutImgController.addImg);
router.put("/delete-about-me/:userId", aboutImgController.imgDelete);

module.exports = router;
