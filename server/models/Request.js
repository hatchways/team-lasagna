const mongoose = require("mongoose");
const Profile = require('./Profile')

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
    completed: {
        type: Boolean,
        default: false
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true },
    { toJSON: { virtuals: true } }
);

// Create a r/ship between user and tasks
requestSchema.virtual('profiles', {
    ref: 'Profile',
    localField: 'user_id',
    foreignField: 'user',
    justOne: true
})

// validate end date and start before saving
requestSchema.pre('save', async function (next) {
    const request = this

    if (this.start > this.end) {
        next(new Error('End Date must be greater than Start Date'));
    } else {
        next();
    }

    next()
})
 
// requestSchema.pre('save', async function (next) {
//     const request = this
//     //new Date('2020-04-14').setHours(00,00,00) - new Date('2020-04-13').setHours(06,00,00)
//     //let hourDiff = (new Date(this.end).getHours(this.end) - new Date(this.start).getHours(this.start))/60*60*1000
//     let hours = { $hour: new Date("2016-01-01T12:00:00Z") }
//     console.log(hours)
//     if ( hourDiff > 8) {
//         next(new Error('Maximum dog sitting hours is 8'));
//     } else {
//         next();
//     }

//     next()
// })

module.exports = Request = mongoose.model("Request", requestSchema);
