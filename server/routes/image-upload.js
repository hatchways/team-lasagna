const express = require("express");
const router = express.Router();

const imgUploadController = require("../controllers/imgUploadController");

router.post("/", imgUploadController.imgUpload);

module.exports = router;
