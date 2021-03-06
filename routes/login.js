const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
const passport = require('passport') ;
const bcrypt =  require('bcryptjs');
const staffModel = require('../Models/staffModel');
router.use(express.static(path.join(__dirname,'../','public')));
/* GET login page.*/
router.get('/', function(req, res, next) {
    if(!req.session.user && !req.session.staff) {
        res.locals.info = null;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }
    else if(req.session.staff){
        res.redirect('/staff/home');
    }
    else{
        res.redirect('/user/home');
    }
});
router.post('/signin', function(req, res, next) {
	let userid;
	passport.authenticate("local", function(err, user, info) {
        if (err) {
			res.locals.info = "Error logging in.";
			res.locals.success=null;
			res.render(path.join(__dirname,'../','views/login.ejs'));
        }
        if (user) {
            if(req.body.identifyLogin == 'PATIENT') {

                let queryString = "SELECT patient_id from PATIENT P,USER_INFO U where U.info_id = P.USER_INFO_info_id AND U.email = ?";
                db.connection.query(queryString, [req.body.email], function (err, result, fields) {
                    if(!result[0]){
                        res.locals.info = "You are not PATIENT !";
                        res.locals.success=null;
                        res.render(path.join(__dirname,'../','views/login.ejs'));
                    }
                    else if (err) {
                        res.send("No such user found");
                    }
                    else {
                        req.session.user = result[0].patient_id;
                        res.redirect('/user/home');
                    }
                });
            }
            else if(req.body.identifyLogin == 'STAFF'){
                let queryString = "SELECT staff_id from STAFF S,USER_INFO U where U.info_id = S.USER_INFO_info_id AND U.email = ?";
                db.connection.query(queryString, [req.body.email], function (err, result, fields) {
                    if(!result[0]){
                        res.locals.info = "You are not staff !";
                        res.locals.success=null;
                        res.render(path.join(__dirname,'../','views/login.ejs'));
                    }
                    else if (err) {
                        throw err;
                    }
                    else {
                        staffModel.findStaff(result[0].staff_id, function (staff) {
                            req.session.staff = result[0].staff_id;
                            res.redirect('/staff/home');
                        });
                    }
                });

            }
            else{
                res.locals.info = "No such requests can be entertained !";
                res.locals.success=null;
                res.render(path.join(__dirname,'../','views/login.ejs'));
            }
        } else {
			res.locals.info = info.message;
			res.locals.success=null;
		  	res.render(path.join(__dirname,'../','views/login.ejs'));
        }
      })(req, res,next);
}) ;
router.get('/signup',function(req,res,next){
	res.locals.info=null;
	res.render(path.join(__dirname,'../','views/signup.ejs'));
});
router.post('/signup',function(req,res,next){
	var hash = bcrypt.hashSync(req.body.password,1);
	let obj1 = {email:req.body.email,password:hash,USER_ROLE_role_id: 3};
	let obj2;
	let id;
	let email = req.body.email;
	let queryString1 = " Insert into USER_INFO set ?";
	let queryString2 = " Insert into PATIENT set ?";
	db.connection.beginTransaction(function(error) {
        if(error) throw error;

        db.connection.query(queryString1, [obj1], function (err1, rows1, fields1) {
            if (err1) {
                return db.connection.rollback(function() {

                    if (err1.errno == 1062) {
                        res.locals.info = "User email already exists";
                        res.locals.success = null;
                        res.render(path.join(__dirname, '../', 'views/login.ejs'));
                    }
                });
            }
            else {

                let queryString3 = "SELECT info_id from USER_INFO where email = ?";

                db.connection.query(queryString3, [email], function (err, result) {
                    if (err) {
                        return db.connection.rollback(function(){
                            throw err;
                        });
                    }
                    else {

                        id = result[0].info_id;
                        obj2 = {
                            first_name: req.body.Fname,
                            last_name: req.body.Lname,
                            address: req.body.Address,
                            cell_no: req.body.CellNo,
                            gender: req.body.gender,
                            USER_INFO_info_id: id
                        };
                        db.connection.query(queryString2, [obj2], function (err2, rows, fields) {
                            if (err2) {
                                db.connection.rollback(function () {

                                    if (err2.errno === 1062) {
                                        res.locals.info = "Contact number already exists";
                                        res.locals.success = null;
                                        res.render(path.join(__dirname, '../', 'views/login.ejs'));
                                    }
                                });
                            }

                            else if (!(err1 && err2)) {
                                db.connection.commit(function (rollback_err) {
                                    if(rollback_err) {
                                        return db.connection.rollback(function () {

                                            throw rollback_err;
                                        });
                                    }
                                    else {
                                        res.locals.success = "User successfully created Please sign in to continue";
                                        res.locals.info = null;
                                        res.render(path.join(__dirname, '../', 'views/login.ejs'))
                                    }
                                });
                            }

                            else {

                                res.locals.info = "Error creating user";
                                res.locals.success = null;
                                res.render(path.join(__dirname, '../', 'views/login.ejs'));

                            }
                        });
                    }
                });

            }
        });
    });
});
module.exports = router;
