const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');

let Plan = require('../models/plan.model');

//Get all Plans
router.route('/').get(ensureAuthenticated, (req, res) => {
    Plan.find({creator: req.user.username})
        .then(plan => {
            res.render('myPlans', {plan: plan})
        });
    
});


//Renders the Create Plan view
router.route('/create').get((req, res) => {
    res.render('myPlans-create');
});

//Create a plan
router.route('/create').post(ensureAuthenticated, (req, res) => {
    const { title, description, eventStart, eventEnd } = req.body;

    const newPlan = new Plan({
        creator: req.user.username,
        title: title,
        description: description,
        eventStart: eventStart,
        eventEnd: eventEnd
    });

    newPlan.save()
        .then(() => { res.redirect('/myPlans/' + newPlan._id) })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Renders specific plan based on its id
router.route('/:id').get((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => res.render('plan', {
            plan: plan
        }))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/invite').get((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => res.render('plan-invite', {
            plan: plan
        }))
        .catch(err => res.status(400).json('Error: ' + err));
});







module.exports = router;