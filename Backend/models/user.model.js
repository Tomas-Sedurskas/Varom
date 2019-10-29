const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    profile:{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;