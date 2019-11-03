const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');

let Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => { res.render('activities', activities) })
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/create').get((req, res) => {
    res.render('activities-create');
});

router.route('/create').post(ensureAuthenticated, (req, res) => {
    const { title, likes, description, budget, budgetContext, location } = req.body;

    const newActivity = new Activity({
        title,
        description,
        budget,
        budgetContext,
        location,
        likes: req.user.profile
    });

    newActivity.save()
        .then(() => res.redirect('/activities'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Activity.findById(req.params.id)
        .then(activities => res.json(activities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Activity.findByIdAndDelete(req.params.id)
        .then(() => res.json("Activity Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Activity.findById(req.params.id)
        .then(activity => {
            activity.title = req.body.title;
            activity.description = req.body.description;

            activity.save()
                .then(() => res.json("Activity updated!"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;