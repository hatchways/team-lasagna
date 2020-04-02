const express = require("express");
const router = express.Router();

const imgUploadController = require("../controllers/imgUploadController");

router.post("/:userId", imgUploadController.imgUpload);

module.exports = router;
