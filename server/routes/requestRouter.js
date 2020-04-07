let express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.getRequestList);
router.get("/:id", requestController.getRequestById);
router.post("/", requestController.createRequest);
router.put("/:id", requestController.updateRequest);
router.post("/:id/pay", requestController.payRequest)
 
module.exports = router;
