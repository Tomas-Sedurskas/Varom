const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    type:{
        type: String,
        required: true,
        unique: false
    },
    location: {
        type: String,
        required: true,
        unique: false
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
        unique: true
    },
},{
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;