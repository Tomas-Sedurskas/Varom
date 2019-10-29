const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

module.exports = (passport) => {
    passport.use(
        new localStrategy({usernameField: 'username'}, (username, password, done) => {
            //Looking for the user
            User.findOne({username: username})
                .then(user => {
                    if(!user){
                        return done(null, false, { msg: 'User does not exist.' })
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){
                            throw err;
                        } 
                        if(isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, {msg: 'Username or password does not match.' })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => {
            done(err, user);
        });
    });
}