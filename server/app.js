const express = require ('express');
const app = express();
const path = require('path');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

mongoose
  .connect(
    'mongodb://localhost:27017/users',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.listen(port, console.log(`Server started on the ${port}`));
