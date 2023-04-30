const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true
    },
    files: {
        data: Buffer,
        contentType: String 
    },
    tagline: {
        type: String,
        required: true
    },
    schedule: {
        type: Date,
    },
    description: {
        type: String,
        required: true,
    },
    moderator: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
        required: true,
    },
    rigor_rank: {
        type: Number,
        required: true,
    },
    attendee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;