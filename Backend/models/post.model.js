const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    comments: [{
        type: String,
        required: false,
        unique: false
    }],
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;