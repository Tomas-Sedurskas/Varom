const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: false
    },
    bio:{
        type: String,
        required: false,
        unique: false
    },
    avatar: {
        type: String,
        required: false,
        unique: false
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }]
}, {
    timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;






