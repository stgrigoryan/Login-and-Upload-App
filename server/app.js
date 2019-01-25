const express = require ('express');
const app = express();
const path = require('path');
const bodyParser = require ('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const routes = require('./routes/index.js');


//Defining port
const port = process.env.PORT || 5000;

//Using bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Serve static files
app.use(express.static(path.join(__dirname, '../public')));

//Routes
app.use('/', routes);

//Using sessions for tracking logins
  app.use(session({
  secret: 'secretization',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Create MongoDB connection
mongoose
  .connect(
    'mongodb://localhost:27017/users',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Starting up the server
app.listen(port, console.log(`Server started on the ${port}`));
