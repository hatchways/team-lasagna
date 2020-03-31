let express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { check } = require("express-validator");

const checkAvailability = [
  check("availability")
    .optional()
    .isArray({ min: 7, max: 7 })
];

router.get("/", profileController.getProfileList);
router.get("/:id", profileController.getProfileById);
router.post("/", checkAvailability, profileController.createProfile);
router.put("/:id", checkAvailability, profileController.updateProfile);

module.exports = router;
