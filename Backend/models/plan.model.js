const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planSchema = new Schema({
    creator: {
        type: String,
        required: true,
        unique: false
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
}, {
    timestamps: true
});

const Plan= mongoose.model('Plan', planSchema);

module.exports = Plan;