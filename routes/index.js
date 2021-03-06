const express = require('express');
const router = express.Router();
const app = express();

const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const gridStream = require('gridfs-stream');

const User = require('../models/users');
const loggedIn = require('../config/authenticated');
const conn = require('../config/db').conn;

//const conn = mongoose.createConnection('mongodb://localhost:27017/users');

let gfs;

conn.once('open', () => {
  gfs = gridStream(conn, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/users',
  file: (req, file) => {
    const filename = 'file_' + Date.now();
    const fileInfo = {
      filename: filename,
      metadata: { username: req.user.username },
      bucketName: 'uploads'
    };
    return fileInfo;
  }
});

const upload = multer({ storage });

router.get('/', (req, res) => res.render('login'));

router.get('/login', (req, res) => res.render('login'));

router.get('/profile', loggedIn, (req, res) => {
  res.render('profile', { data: req.user.username }) ;
});

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    res.send('All fields must be filled out!');
  }
  if (password !== confirmPassword) {
    res.send('Passwords must be identical!');
  }

  User.findOne({
    username: username
  }).then(user => {
    if (user) {
      res.send('Username is taken');
    } else {
      const newUser = new User({
        username,
        password
      });

      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.render('login');
            })
            .catch(err => console.log(err));
        })
      );
    }
  });
});

router.post('/login', (req, res, next) => {
  console.log('login');
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
    //failureFlash: true
  })(req, res, next);
  //console.log("Login", req.user);
});

router.post('/upload', loggedIn, upload.single('image'), (req, res) => {
  res.json({ file: req.file });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.render('login');
});

module.exports = router;
