let express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.getRequestList);

// get user created request/bookings by passing the owner(user) id
router.get("/owner/:id", requestController.getOwnerRequestList);

router.get("/:id", requestController.getRequestById);
router.post("/", requestController.createRequest);

// Update Request, request id as param
router.put("/:id", requestController.updateRequest);

// Your next booking: Approved requests, your upcoming booking. pass sitterId
router.get("/upcomingBookings/:sitterId", requestController.getUpcomingBookedRequests);

// Current bookings: Requests pending approval/deny, pass sitterId
router.get("/pendingBookings/:sitterId", requestController.getPendingRequests);

// Complete Request after work is done, pass request _id.
router.put("/completeBooking/:id", requestController.completeRequest);

// Past bookings: Approved requested, completed and in the past. pass sitterId
router.get("/completedPastBookings/:sitterId", requestController.getCompletedRequests);

// User automatically pay for the service rendered by the sitter, request id is passed as param
router.post("/:id/pay", requestController.payRequest)

// The sitter is paid for the service they have rendered in the last two weeks, sitterId is passed as param.

 
module.exports = router;
