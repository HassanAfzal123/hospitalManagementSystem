const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../', 'public')));
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/admin');
const Staff = require('../Models/staff');
const Ward = require('../Models/ward');
const Disease = require('../Models/disease');

router.get('/login', function (req, res) {
    if (!req.session.user) {
        res.locals.info = null;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/adminLogin.ejs'));
    }
    else {
        res.redirect('/admin/home');
    }
});
router.post('/login', function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            res.locals.info = "Error logging in.";
            res.locals.success = null;
            res.render(path.join(__dirname, '../', 'views/adminLogin.ejs'));
        }
        if (user) {
            let queryString = "SELECT admin_id from ADMIN A,USER_INFO U where U.info_id = A.USER_INFO_info_id AND U.email = ?";
            db.connection.query(queryString, [req.body.email], function (err, result, fields) {
                if (err) {
                    res.send("No such user found");
                }
                else {
                    req.session.user = result[0].patient_id;
                    res.redirect('/admin/home');
                }
            });
        } else {
            res.locals.info = info.message;
            res.locals.success = null;
            res.render(path.join(__dirname, '../', 'views/login.ejs'));
        }
    })(req, res, next);
});
router.post('/addAdmin', function (req, res) {
    var hash = bcrypt.hashSync(req.body.password, 1);
    const userInfo = new userInfo(req.body.email,hash,1);
    const newAdmin = new Admin(req.body.name,req.body.cellNo,req.body.cnicNo,gender);
    const admin = new Admin();
    let result=admin.addAdmin(newAdmin,userInfo);
    if(result.status==200){
        res.locals.info = null;
        res.locals.success = result.success;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }else{
        res.locals.info = result.response;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }
    
});
router.post('/addStaff', function (req, res) {
    var hash = bcrypt.hashSync("password", 1);
    const userInfo = new userInfo(req.body.email,hash,2);
    const staff = new Staff(req.body.name,req.body.cellNo,req.body.cnicNo,gender);
    const admin = new Admin();
    let result=admin.addStaff(staff,userInfo);
    if(result.status==200){
        res.locals.info = null;
        res.locals.success = result.success;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }else{
        res.locals.info = result.response;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }
    
});
router.post("/addWard",async (req, res) => {
    let admin = new Admin();
    let ward = new Ward(req.body.name,req.body.bedCount,req.body.class)
    let result = await admin.addWard(ward);
    res.status(result.status).json({
        response: result.response
    })
});
router.post("/addDisease", async (req, res) => {
    let admin = new Admin();
    let disease = new Disease(req.body.name,req.body.description,req.body.symptoms);
    let result = await admin.addDisease(disease);
    res.status(result.status).json({
        response: result.response
    })
});
router.post("/addMedicine", async (req, res) => {
    let admin = new Admin();
    let medicine = new medicine(medicine,company);
    let result = await admin.addMedicine(medicine);
    res.status(result.status).json({
        response: result.response
    })
});
module.exports = router;