const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
const passport = require('passport') ;
router.use(express.static(path.join(__dirname,'../','public')));
/* GET login page.*/
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../','Views/login.html'));
});
// router.post('/authenticate',
// 	passport.authenticate('local-login', 
// 	{
// 		successRedirect: '/',
// 		failureRedirect: '/login'
// 	}));		
router.post('/authenticate', function(req, res, next) {

	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
	})(req, res, next) ;
}) ;		   
module.exports = router;
