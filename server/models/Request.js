const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sitter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    declined: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    } 
},
    {
        timestamps: true
});

module.exports = Request = mongoose.model("Request", requestSchema);
