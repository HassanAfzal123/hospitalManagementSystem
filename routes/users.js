var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
const db = require('../database');
const bcrypt = require('bcryptjs');
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
              res.render(path.join(__dirname,'../','Views/layouts/dashboard.hbs'),{user: result[0]});
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
        res.sendFile(path.join(__dirname,'../','Views/tables.html'));
    }
    else
    {
        res.send("You are not logged in!");
    }

});
router.get('/logout', function(req, res, next) {
    if(req.session.user) {
        req.session.destroy();
        res.locals.info = null;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'Views/login.ejs'));
    }
});
router.post('/update', function (req,res,next) {
    if(req.session.user){
        let queryString = "UPDATE PATIENT SET ? where PATIENT.patient_id = ?";
        let newUser_info = {first_name: req.body.FnewName, last_name: req.body.LnewName, address: req.body.newAddress};
        console.log(newUser_info);
        db.connection.query(queryString,[newUser_info,req.session.user],function(err2,rows,fields) {
           if(err2){
               throw err2;
           }
           else {

               res.redirect('/user/home');

           }
        });
    }
});
router.post('/changepass', function (req,res,next) {
    if(req.session.user){
        var hash = bcrypt.hashSync(req.body.newPassword,1);
        let queryString = "UPDATE USER_INFO SET ? where info_id = (SELECT USER_INFO_info_id FROM PATIENT where patient_id = ?)";
        let newUser_Pass = {password: hash};
        console.log(newUser_Pass);
        db.connection.query(queryString,[newUser_Pass,req.session.user],function(err2,rows,fields) {
            req.session.destroy();
            if(err2){
                res.locals.info = "Password wasn't updated successfully, kindly use your old password for login.";
                res.locals.success = null;
                res.render(path.join(__dirname, '../', 'Views/login.ejs'));
            }
            else {
                res.locals.info = null;
                res.locals.success = "Password Updated Successfully. You can now login with your new password !";
                res.render(path.join(__dirname, '../', 'Views/login.ejs'));

            }
        });
    }
});
module.exports = router;