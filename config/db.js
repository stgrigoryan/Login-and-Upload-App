const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/users', { useNewUrlParser: true })
  .catch(err => console.log(err.message));

const conn = mongoose.connection;
mongoose.Promise = global.Promise;

module.exports = {
  conn,
  User: require('../models/users')
}
