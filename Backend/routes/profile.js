const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

let Profile = require('../models/profile.model');
let User = require('../models/user.model')
let Event = require('../models/event.model')
/*
router.route('/').get(ensureAuthenticated, (req, res) => {
    res.render('profile', {user: req.user});
});
*/

/*
router.route('/').get(ensureAuthenticated, (req, res) => {
    User.findOne({username: req.user.username})
        .populate('profile')
        .exec()
        .then(user => {
            res.render('profile', {user} )
        })  
});
*/

router.route('/').get(ensureAuthenticated, (req, res) => {
    Profile.aggregate([
        {$match: {"_id": req.user.profile}},
        {$lookup: {from: "events", as: "events", localField: "_id", foreignField: "creator"}}
    ])
    .then(data => {
        console.log(data[0])
        res.render('profile', { data: data[0] })
    })
});

router.route('/create').get(ensureAuthenticated, (req, res) => {
    res.render('profile-create');
});

router.route('/create').post(ensureAuthenticated, (req, res) => {
    
    const { displayName, bio, avatar } = req.body;

    const newProfile = new Profile({
        _id: req.user.profile,
        displayName,
        bio,
        avatar
    });

    newProfile.save()
        .then(() => res.redirect('/profile'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;