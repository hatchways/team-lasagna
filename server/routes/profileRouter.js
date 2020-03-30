let express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

const asyncHandler = asyncFun => (req, res, next) => {
  asyncFun(req, res, next).catch(next);
};

router.get("/", profileController.getProfileList);
router.get("/:id", profileController.getProfileById);
router.post("/", asyncHandler(profileController.createProfile));
router.put("/:id", profileController.updateProfile);

module.exports = router;
