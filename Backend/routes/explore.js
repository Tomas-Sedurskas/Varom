const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => {
            res.render('explore', {
                activities: activities
            })
        })

        .catch(err => res.status(400).json('Error: ' + err));
        
});

module.exports = router;
