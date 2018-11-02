var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'../','public')));
/* GET users listing. */
router.get('/home', function(req, res, next) {
  if(req.session.user) {
      res.send("Welcome to Home Screen");
  }
  else
  {
    res.send("You are not logged in!");
  }
});

module.exports = router;