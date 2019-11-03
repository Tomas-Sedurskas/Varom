const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    description:{
        type: String,
        required: false,
        unique: false
    },
    budget:{
        type: String,
        required: true,
        unique: false
    },
    budgetContext: {
        type: String,
        required: true,
        unique: false
    },
    img:{
        type: String,
        required: false,
        unique: false
    },
    location: {
        type: String,
        required: true,
        unique: false
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }]
},{
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;