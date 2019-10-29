const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    bio:{
        type: String,
        required: false,
        unique: false
    },
    displayName: {
        type: String,
        required: true,
        unique: false
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    avatar:{
        type: String,
        required: true,
        unique: false
    },
    notifications:{
        type: String,
        required: true,
        unique: false
    }
}, {
    timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;






