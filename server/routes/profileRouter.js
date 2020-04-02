let express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const validation = require("../utils/profileValidation");

router.get("/", profileController.getProfileList);
router.get("/:id", profileController.getProfileById);
router.post("/", validation, profileController.createProfile);
router.put("/:id", validation, profileController.updateProfile);

module.exports = router;
