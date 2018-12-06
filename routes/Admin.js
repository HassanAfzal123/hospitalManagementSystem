const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../', 'public')));
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/admin');
const UserInfo = require('../Models/userInfo');
const Staff = require('../Models/staff');
const Ward = require('../Models/ward');
const Disease = require('../Models/disease');
const Medicine = require('../Models/medicine');
router.get('/',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/adminHome.html'));
})
router.get('/addStaff',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/addStaff.html'));
})
router.get('/addAdmin',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/addAdmin.html'));
})
router.get('/addWard',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/addWard.html'));
})
router.get('/addMedicine',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/addMedicine.html'));
})
router.get('/getAdminData',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/getAdmin.html'));
})
router.get('/getStaffData',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/getStaff.html'));
})
router.get('/addDisease',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views/addDisease.html'));
})
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
router.post('/addAdmin',async (req, res)=> {
    var hash = bcrypt.hashSync("password", 1);
    const userInfo = new UserInfo(req.body.email,hash,1);
    const newAdmin = new Admin(req.body.name,req.body.cell_no,req.body.cnic_no,req.body.gender);
    const admin = new Admin();
    let result = await admin.addAdmin(newAdmin,userInfo);
    console.log(result)
    if(result.status==200){
        // res.locals.info = null;
        // res.locals.success = result.response;
        // res.render(path.join(__dirname, '../', 'views/login.ejs'));
        //console.log(result.response+" "+result.status);
        res.sendFile(path.join(__dirname,'../','views/addAdmin.html'));
    }else{
        // res.locals.info = result.response;
        // res.locals.success = null;
        // res.render(path.join(__dirname, '../', 'views/login.ejs'));
        //console.log(result.response+" "+result.status);
        res.sendFile(path.join(__dirname,'../','views/addAdmin.html'));
    }
    
});
router.post('/addStaff', async (req, res)=> {
    var hash = bcrypt.hashSync("password", 1);
    const userInfo = new UserInfo(req.body.email,hash,2);
    const staff = new Staff(req.body.name,req.body.cell_no,req.body.cnic_no,req.body.gender);
    const admin = new Admin();
    let result=await admin.addStaff(staff,userInfo);
    if(result.status==200){
        res.locals.info = null;
        res.locals.success = result.success;
        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
        res.send("success");
    }else{
        res.locals.info = result.response;
        res.locals.success = null;
        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
        res.send(result.response)
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
    let medicine = new Medicine(req.body.name,req.body.company);
    let result = await admin.addMedicine(medicine);
    res.status(result.status).json({
        response: result.response
    })
});
router.get('/getAdmin', async (req,res)=>{
    let admin = new Admin();
    let result = await admin.getAdmin();
    res.status(result.status).json({
        data: result.response
    })
});
router.get('/getStaff', async (req,res)=>{
    let admin = new Admin();
    let result = await admin.getStaff();
    res.status(result.status).json({
        data: result.response
    })
});
module.exports = router;