var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'../','public')));
/* GET users listing. */
router.get('/appointment', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','Views/appointment.html'));
});

module.exports = router;