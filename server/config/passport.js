const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/users.js');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({username: username})
        .then (user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect or not registered username.' });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Password is not correct'});
            }
          });
        });
    })
  )
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) throw err;
      done(null, user);
    });
  });
};
