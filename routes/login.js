const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
const passport = require('passport') ;
router.use(express.static(path.join(__dirname,'../','public')));
/* GET login page.*/
router.get('/', function(req, res, next) {
	res.locals.info = null;
    res.render(path.join(__dirname,'../','Views/login.ejs'));
});
router.post('/signin', function(req, res, next) {
	passport.authenticate("local", function(err, user, info) {
        if (err) {
			res.locals.info = err;
			res.render(path.join(__dirname,'../','Views/login.ejs'));
        }
        if (user) {
        	req.session.user = user;
			res.redirect('/user/home');
        } else {
			res.locals.info = info.message;
		  	res.render(path.join(__dirname,'../','Views/login.ejs'));
        }
      })(req, res,next);
}) ;
router.get('/signup',function(req,res,next){
	res.sendfile(path.join(__dirname,'../','Views/signup.html'))
});
module.exports = router;
