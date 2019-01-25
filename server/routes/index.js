const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '../../../public/login.html'));
});

router.post('/register', (req,res) => {
  const { username, password, confirmPassword} = req.body;

  if ( !username || !password || !confirmPassword) {
    res.send("All fields must be filled out!");
  }
  if (password !== confirmPassword) {
    res.send("Passwords must be identical!");
  }

  User.findOne({ username: username})
    .then (user => {
      if(user) {
      res.send("Username is taken");
    } else {
        const newUser = new User ({
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
        }))
      }
    });
});

router.post('/login', (req,res) => {
  passport.authenticate('local', {
    successRedirect: '/profile.html',
    failureRedirect: '/login.html',
    failureFlash: true
  });
});

module.exports = router;
