const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');
const loggedIn = require('../config/authenticated');

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '../../../public/login.html')));

router.get('/login', (req, res) => res.sendFile(path.join(__dirname + '../../../public/login.html')));

router.get('/profile', loggedIn, (req, res) => {
  console.log('profile');
  res.sendFile(path.join(__dirname + '../../../public/profile.html'));
});

router.post('/register', (req, res) => {
  const {
    username,
    password,
    confirmPassword
  } = req.body;

  if (!username || !password || !confirmPassword) {
    res.send("All fields must be filled out!");
  }
  if (password !== confirmPassword) {
    res.send("Passwords must be identical!");
  }

  User.findOne({
      username: username
    })
    .then(user => {
      if (user) {
        res.send("Username is taken");
      } else {
        const newUser = new User({
          username,
          password
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser.save()
              .then(user => {
                res.sendFile(path.join(__dirname + '../../../public/login.html'));
              })
              .catch(err => (console.log(err)));
          }));
      }
    });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
    //failureFlash: true
  })(req, res, next);
  console.log("Login");
});

router.get('/logout', (req, res) => {
  req.logout();
  res.sendFile(path.join(__dirname + '../../../public/login.html'));
});

module.exports = router;
