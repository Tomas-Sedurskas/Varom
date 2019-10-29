const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(console.log(activities)))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const newActivity = new Activity({
        title,
        description
    });

    newActivity.save()
        .then(() => res.json('Activity added!'))
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