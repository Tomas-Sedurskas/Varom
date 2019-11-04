const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
let User = require('../models/user.model');


/** Register Routes **/
router.route('/register').get((req, res) => {
    res.render('register');
});


router.route('/register').post((req, res) => {

    const { username, password, confirmPassword } = req.body;
    

    /** Form validation before submission **/
    let errors = {
        username: [],
        password: [],
        confirmPassword: []
    }

    //Checking for empty fields
    if(!username){
        errors.username.push({msg: "Please fill in all fields!"})
    }
    if (!password){
        errors.password.push({msg: "Please fill in all fields!"})
    }
    if (!confirmPassword) {
        errors.confirmPassword.push({msg: "Please fill in all fields!"})
    }
    // Password match check
    if(password !== confirmPassword){
        errors.confirmPassword.push({msg: 'Passwords do not match!'})
    }
    if (errors.username.length > 0 || errors.password.length > 0 || errors.confirmPassword.length > 0) {
        res.render('register', {
            errors,
            username,
            password,
            confirmPassword
        })
    } else {
        User.findOne({username: username})
            .then(user => {
                if(user){
                    errors.username.push({
                        msg: "Username already exists"
                    });
                    res.render('register', {
                        errors,
                        username,
                        password,
                        confirmPassword
                    })
                } else {
                    const newUser = new User({ 
                        username, 
                        password,
                        profile: mongoose.Types.ObjectId()
                    });

                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(() => res.redirect('/users/login'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    }))
                }
            })
    }   
});


//Register Success 

router.route('/success').get((req, res) => {
    res.render('registerSuccess');
});

/** Login Routes **/
router.route('/login').get((req, res) => {
    res.render('login');
});

router.route('/login').post((req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/explore',
        failureRedirect: '/users/login'
    })(req, res, next)
});



router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/users/login');
})



module.exports = router;