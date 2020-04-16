const Request = require("../models/Request");
const { validationResult } = require("express-validator");

module.exports.getRequestList = async (req, res, next) => {
  try {
    const requests = await Request.find();
    if (requests === undefined || requests.length == 0) {
      return res.status(404).json({ err: "No requests founds" });
    }
    res.status(200).json(requests);
  } catch (err) {
    res.status(400).json("Unable to retreive requests");
  }
};

// Get all created requests of a dog owner
module.exports.getOwnerRequestList = async (req, res, next) => {
  try {
    const requests = await Request.find({user_id:req.params.id});
    if (requests === undefined || requests.length == 0) {
      return res.status(404).json({ err: "No requests founds" });
    }
    res.status(200).json(requests);
  } catch (err) {
    res.status(400).json("Unable to retreive requests");
  }
};

module.exports.getRequestById = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(400).json("Unable to retreive request");
  }
};

module.exports.updateRequest = async (req, res, next) => {
  const errors = validationResult(req);
  //check validators
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).send({ msg: "Invalid submission", errors });
  }

  const {
    userId,
    sitterId,
    start,
    end,
    accepted,
    declined,
    completed
  } = req.body;
  // if you need to limit time for each dog sitting

  // let hourDiff = (new Date(end).getTime() - new Date(start).getTime()) /60*60*1000
  // console.log('difference in hours is '+ hourDiff)
  // if (hourDiff > 8) {
  //   console.log('Difference in time is more than 8 hours')
  //   return res.status(400).send({ msg: "Dog sitting take maximum of 8 hours"});
  // }
  const data = {
    user_id: userId,
    sitter_id: sitterId,
    start: new Date(start),
    end:new Date(end),
    accepted: accepted || false,
    declined: declined || false,
    completed: completed || false
  };
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ msg: "Request not found" });
    }
    res.status(200).json({ updatedRequest, msg: "Successfully updated request" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.createRequest = async (req, res, next) => {
  //const date = new Date()
  const errors = validationResult(req);
  //check validators
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).send({ msg: "Invalid submission", errors });
  }
  const {
    userId,
    sitterId,
    start,
    end,
    accepted,
    declined,
    completed
  } = req.body;
  // if you need to limit time for each dog sitting

  // let hourDiff = (new Date(end).getTime() - new Date(start).getTime()) /60*60*1000
  // console.log('difference in hours is '+ hourDiff)
  // if (hourDiff > 8) {
  //   console.log('Difference in time is more than 8 hours')
  //   return res.status(400).send({ msg: "Dog sitting take maximum of 8 hours"});
  // }
  const data = {
    user_id: userId,
    sitter_id: sitterId,
    start: new Date(start),
    end:new Date(end),
    accepted: accepted || false,
    declined: declined || false,
    completed: completed || false
  };

  try {
    const newRequest = await Request.create(data);
    res.status(200).json({ newRequest, msg: "Request created successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// Your next booking: Approved requests, your upcoming booking
module.exports.getUpcomingBookedRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({sitter_id:req.params.sitterId, start: {$gte: new Date()}, accepted:true, completed:false, paid:false });
    if (requests === undefined || requests.length == 0) {
      return res.status(404).json({ msg: "Request not found" });
    }
    res.status(200).json({ requests, msg: "Requests retrieved Successfully" });
  } catch (err) {
    res.status(400).json("Unable to retreive request");
  }
};

// update Request as completed
module.exports.completeRequest = async (req, res, next) => {
  const {
    userId,
    sitterId,
    start,
    end,
    accepted,
    declined,
    completed
  } = req.body;

// ensure that the end time of the request is already past
 let timeDiff = Math.floor((new Date().getTime() - new Date(end).getTime()) / 60000)
 console.log('difference in minutes is '+ timeDiff)
if (timeDiff < -5) {
  console.log('The shift has not ended, why are you trying to complete now')
  return res.status(400).send({ msg: "Dog sitting shift cannot be completed until " + new Date(end).getDate()});
}
const data = {
  user_id: userId,
  sitter_id: sitterId,
  start: new Date(start),
  end:new Date(end),
  accepted: accepted || true,
  declined: declined || false,
  completed: completed || true
};
try {
  const updatedRequest = await Request.findByIdAndUpdate(
    req.params.id,
    data,
    {
      new: true,
      runValidators: true
    }
  );
  if (!updatedRequest) {
    return res.status(404).json({ msg: "Request not found" });
  }
  res
    .status(200)
    .json({ updatedRequest, msg: "Request Completed Successfully" });
} catch (err) {
  res.status(400).json(err.message);
}
}

// Past bookings: Approved requested, completed and in the past
module.exports.getCompletedRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({sitter_id:req.params.sitterId, accepted:true, declined:false, completed:true });
    if (requests === undefined || requests.length == 0) {
      return res.status(404).json({ msg: "Request not found" });
    }
    res.status(200).json(requests);
  } catch (err) {
    res.status(400).json("Unable to retreive request");
  }
};

// Current bookings: Requests pending approval/deny
module.exports.getPendingRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({sitter_id:req.params.sitterId, start: {$gte: new Date()}, accepted:false, declined:false, completed: false });
    if (requests === undefined || requests.length == 0) {
      return res.status(404).json({ msg: "Request not found" });
    }
    res.status(200).json(requests);
  } catch (err) {
    res.status(400).json("Unable to retreive request");
  }
};

module.exports.payRequest = async (req, res, next) => {
    try {
        const updatedRequest = await Request.findByIdAndUpdate(
          req.params.id,
          { paid: true}, {new: true}
        );
        if (!updatedRequest) {
          return res.status(404).json({ msg: "Request not found" });
        }
        res
          .status(200)
          .json({ updatedRequest, msg: "Successfully updated request" });
      } catch (err) {
        res.status(400).json(err.message);
      }
}