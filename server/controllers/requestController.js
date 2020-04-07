const Request = require("../models/Request");
const { validationResult } = require("express-validator");

module.exports.getRequestList = async (req, res, next) => {
  try {
    const requests = await Request.find();
    if (!requests) {
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
  } = req.body;
  const data = {
    user_id: userId,
    sitter_id: sitterId,
    start: new Date(start),
    end:new Date(end),
    accepted: accepted,
    declined: declined,
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
      .json({ updatedRequest, msg: "Successfully updated request" });
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
  } = req.body;
  const data = {
    user_id: userId,
    sitter_id: sitterId,
    start: new Date(start),
    end:new Date(end),
    accepted: accepted,
    declined: declined,
  };

  try {
    const newRequest = await Request.create(data);
    res.status(200).json({ newRequest, msg: "Request created successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.payRequest = async (req, res, next) => {
    try {
        const updatedRequest = await Request.findByIdAndUpdate(
          req.params.id,
          { paid: true}
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