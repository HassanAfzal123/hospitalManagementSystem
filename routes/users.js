var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
/* GET users listing. */
router.post('/appointment', function(req, res, next) {
  console.log(req.body);
  res.send();
});

module.exports = router;