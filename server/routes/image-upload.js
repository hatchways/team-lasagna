const express = require("express");
const router = express.Router();

const imgUploadController = require("../controllers/imgUploadController");

router.post("/:userId", imgUploadController.imgUpload);
router.delete("/:userId", imgUploadController.imgDelete);

module.exports = router;
