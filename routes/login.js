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
        	req.session.user = user;
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
	var hash = bcrypt.hashSync(req.body.UserPassword,1);
	let obj = {email:req.body.email,UserPassword:hash,Fname:req.body.Fname,Lname:req.body.Lname,Address:req.body.Address,CellNo:req.body.CellNo};	
	let queryString = " Insert into UserInfo set ?"
	db.connection.query(queryString,[obj], function(err, rows, fields) {
		//if (err) throw (err);
		if(!err)
		{
			res.locals.success="User successfully created Please sign in to continue";
			res.locals.info=null;
			res.render(path.join(__dirname,'../','Views/login.ejs'))
		}
        else {
			
			if(err.errno==1062){
				res.locals.info="User email already exists";
				res.render(path.join(__dirname,'../','Views/signup.ejs'));
			}
			else{
				res.locals.info="Error creating user";
				res.render(path.join(__dirname,'../','Views/signup.ejs'));
			}
			
        }		
    });
});
module.exports = router;
