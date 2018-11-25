var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
const db = require('../database');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'../','public')));
/* GET users listing. */
router.get('/home', function(req, res, next) {
    let queryString = "SELECT P.first_name,P.last_name,P.gender,P.address,P.cell_no,U.email from PATIENT P,USER_INFO U where U.info_id = P.USER_INFO_info_id AND patient_id = ?";
  if(req.session.user) {
      db.connection.query(queryString,[req.session.user],function (err,result,fields) {
          if(err){
              throw err;
          }
          else {
              console.log(result[0]);
              res.render(path.join(__dirname,'../','views/layouts/dashboard.hbs'),{user: result[0]});
          }
      });

  }
  else
  {
    res.send("You are not logged in!");
  }
});
router.get('/reports', function (req,res,next) {
    if(req.session.user) {
        res.sendFile(path.join(__dirname,'../','views/tables.html'));
    }
    else
    {
        res.send("You are not logged in!");
    }

});
router.get('/logout', function(req, res, next) {
        req.session.destroy();
    res.locals.info = null;
    res.locals.success=null;
        res.render(path.join(__dirname,'../','views/login.ejs'));

});
module.exports = router;