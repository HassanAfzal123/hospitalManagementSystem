const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
const passport = require('passport') ;
const bcrypt =  require('bcryptjs');
router.use(express.static(path.join(__dirname,'../','public')));
/* GET login page.*/
router.get('/', function(req, res, next) {
	res.locals.info = null;
	res.locals.success=null;
    res.render(path.join(__dirname,'../','Views/login.ejs'));
});
router.post('/signin', function(req, res, next) {
	passport.authenticate("local", function(err, user, info) {
        if (err) {
			res.locals.info = "Error logging in.";
			res.locals.success=null;
			res.render(path.join(__dirname,'../','Views/login.ejs'));
        }
        if (user) {
        	req.session.user = req.body.email;
			res.redirect('/user/home');
        } else {
			res.locals.info = info.message;
			res.locals.success=null;
		  	res.render(path.join(__dirname,'../','Views/login.ejs'));
        }
      })(req, res,next);
}) ;
router.get('/signup',function(req,res,next){
	res.locals.info=null;
	res.render(path.join(__dirname,'../','Views/signup.ejs'));
});
router.post('/signup',function(req,res,next){
	var hash = bcrypt.hashSync(req.body.password,1);
	let obj1 = {email:req.body.email,password:hash,USER_ROLE_role_id: 3};
	let obj2;
	let id;
	let email = req.body.email;
	let queryString1 = " Insert into USER_INFO set ?";
	let queryString2 = " Insert into PATIENT set ?";
	db.connection.query(queryString1,[obj1], function(err1, rows1, fields1) {

		if(err1) {

            if (err1.errno == 1062) {
                res.locals.info = "User email already exists";
                res.locals.success = null;
                res.render(path.join(__dirname, '../', 'Views/login.ejs'));
            }
        }
		else {

            let queryString3 = "SELECT info_id from USER_INFO where email = ?";

            db.connection.query(queryString3, [email], function (err, result) {
            	if (err) {
                    throw err;
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
                        if (err2.errno == 1062) {
                            res.locals.info = "Contact number already exists";
                            res.locals.success = null;
                            res.render(path.join(__dirname, '../', 'Views/login.ejs'));
                        }

                        if (!(err1 && err2)) {
                            res.locals.success = "User successfully created Please sign in to continue";
                            res.locals.info = null;
                            res.render(path.join(__dirname, '../', 'Views/login.ejs'))
                        }

                        else {

                            res.locals.info = "Error creating user";
                            res.locals.success=null;
                            res.render(path.join(__dirname, '../', 'Views/login.ejs'));

                        }
                    });
                }
            });

        }
    });

});
module.exports = router;
