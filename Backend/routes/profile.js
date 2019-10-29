const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.route('/').get(ensureAuthenticated, (req, res) => {
    console.log(req.user)
    res.render('profile', {username: req.user.username});
});

module.exports = router;