const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

router.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '../../../public/login.html'));
});

router.post('/register', (req,res) => {
  console.log(req.body);
});

module.exports = router;
