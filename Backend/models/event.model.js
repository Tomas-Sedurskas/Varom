const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    shared: {
        type: Boolean,
        required: true,
        unique: false,
        default: false
    },
    public: {
        type: Boolean,
        required: true,
        unique: false,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    eventStart: {
        type: Date,
        required: true,
        unique: false
    },
    eventEnd: {
        type: Date,
        required: true,
        unique: false
    },
    invitedAttendees:[{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }]
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;