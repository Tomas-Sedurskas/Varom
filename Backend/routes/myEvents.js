const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');

let Event = require('../models/event.model');
let Post = require('../models/post.model');
//Get all Events
router.route('/').get(ensureAuthenticated, (req, res) => {
    Event.find({creator: req.user.profile})
        .then(event => {
            res.render('myEvents', {event})
        });
    
});


//Renders the Create Event view
router.route('/create').get((req, res) => {
    res.render('event-create');
});

//Create an Event
router.route('/create').post(ensureAuthenticated, (req, res) => {
    const { title, description, eventStart, eventEnd, public } = req.body;

    const newEvent = new Event({
        public,
        creator: req.user.profile,
        title,
        description,
        eventStart,
        eventEnd
    });
    newEvent.save()
        .then(() => { res.redirect('/myEvents/' + newEvent._id) })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/share').post(ensureAuthenticated, (req, res) => {

    const { comments, likes, event } = req.body;
    const newPost = new Post({
        comments,
        likes: req.user.profile,
        event: req.params.id
    })

    newPost.save()
        .then(() => res.redirect('/myEvents/' + req.params.id))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Renders specific event based on its id
router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.render('event', { event }))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/invite').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.render('event-invite', { event }))
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;