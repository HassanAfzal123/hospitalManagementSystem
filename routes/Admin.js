const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../', 'public')));
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/admin');
const Doctor = require('../Models/doctor');
const UserInfo = require('../Models/userInfo');
const Staff = require('../Models/staff');
const Ward = require('../Models/ward');
const Disease = require('../Models/disease');
const Medicine = require('../Models/medicine');
router.get('/home',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/adminHome.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/addStaff',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/addStaff.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/addAdmin',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/addAdmin.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/addDoctor',async(req,res)=>{
    if(req.session.admin){
        const admin = new Admin();
        let disease = await admin.getDiseaseList();
        res.locals.disease=disease.response
        res.render(path.join(__dirname,'../','views/addDoctor.ejs'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/addWard',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/addWard.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/addMedicine',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/addMedicine.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/addDisease',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/addDisease.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getAdminData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getAdmin.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getStaffData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getStaff.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getMedicineData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getMedicine.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getDiseaseData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getDisease.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getWardData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getWard.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getDoctorDataData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getDoctor.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getBloodRequestData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getBloodRequest.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getHomeServiceData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getHomeService.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/getAppointmentData',async(req,res)=>{
    if(req.session.admin){
        res.sendFile(path.join(__dirname,'../','views/getAppointment.html'));
    }
    else{
        res.send("Please login to continue");
    }
})
router.get('/', function (req, res) {
    if (!req.session.admin) {
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
            res.locals.info = "Error logging in";
            res.locals.success = null;
            res.render(path.join(__dirname, '../', 'views/adminLogin.ejs'));
        }
        if (user){
            let queryString = "SELECT admin_id from ADMIN A,USER_INFO U where U.info_id = A.USER_INFO_info_id AND U.email = ?";
            db.connection.query(queryString, [req.body.email], function (err, result, fields) {
                if (err) {
                    res.send("No such user found");
                }
                else {
                    req.session.admin = result[0].admin_id;
                    res.redirect('/admin/home');
                }
            });
        } else {
            res.locals.info = info.message;
            res.locals.success = null;
            res.render(path.join(__dirname, '../', 'views/adminLogin.ejs'));
        }
    })(req, res, next);
});
router.post('/addAdmin',async (req, res)=> {
    if (req.session.admin) {
        var hash = bcrypt.hashSync("password", 1);
        const userInfo = new UserInfo(req.body.email, hash, 1);
        const newAdmin = new Admin(req.body.name, req.body.cell_no, req.body.cnic_no, req.body.gender);
        const admin = new Admin();
        let result = await admin.addAdmin(newAdmin, userInfo);
        if (result.status == 200) {
            res.sendFile(path.join(__dirname, '../', 'views/addAdmin.html'));
        } else {
            res.send(result.response);
        }
    }
    else{
        res.send("Please Login to continue");
    }
});
router.post('/addStaff', async (req, res)=> {
    if (req.session.admin) {
        var hash = bcrypt.hashSync("password", 1);
        const userInfo = new UserInfo(req.body.email, hash, 2);
        const staff = new Staff(req.body.name, req.body.cell_no, req.body.cnic_no, req.body.gender);
        const admin = new Admin();
        let result = await admin.addStaff(staff, userInfo);
        if (result.status == 200) {
            res.sendFile(path.join(__dirname, '../', 'views/addStaff.html'));
        } else {
            res.send(result.response)
        }
    }
    else{
        res.send("Please Login to continue");
    }
    
});
router.post("/addWard",async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let ward = new Ward(req.body.name, req.body.bedCount, req.body.class)
        let result = await admin.addWard(ward);
        if(result.status==200){
            res.sendFile(path.join(__dirname, '../', 'views/addWard.html'));
        }
        else{
            res.status(result.status).json({
                response: result.response
            })
        }
    }
    else{
        res.send("Please Login to continue");
    }
});
router.post("/addDisease", async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let disease = new Disease(req.body.name, req.body.description, req.body.symptoms);
        let result = await admin.addDisease(disease);
        if(result.status==200){
            res.sendFile(path.join(__dirname, '../', 'views/addDisease.html'));
        }
        else{
            res.status(result.status).json({
                response: result.response
            })
        }
    }
    else{
        res.send("Please Login to continue");
    }
});
router.post("/addMedicine", async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let medicine = new Medicine(req.body.name, req.body.company);
        let result = await admin.addMedicine(medicine);
        if(result.status==200){
            res.sendFile(path.join(__dirname, '../', 'views/addMedicine.html'));
        }else{
            res.status(result.status).json({
                response: result.response
            })
        }
    }
    else{
        res.send("Please Login to continue");
    }
});
router.get('/getAdmin', async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getAdmin();
        res.status(result.status).json({
            data: result.response
        })
    }
    else {
        res.send("Please Login to continue");
    }
});
router.post('/addDoctor', async (req, res) => {
    if (req.session.admin) {
        let doctor = new Doctor(req.body.name,req.body.cell_no,req.body.cnic_no,req.body.gender,req.body.disease);
        let admin = new Admin(doctor);
        let result = await admin.addDoctor(doctor);
        if(result.status!=200){
            res.status(result.status).json({
                data: result.response
            })
        }
        else{
            res.sendFile(path.join(__dirname, '../', 'views/addDoctor.html'));
        }
        
    }
    else {
        res.send("Please Login to continue");
    }
});
router.get('/getStaff', async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getStaff();
        res.status(result.status).json({
            data: result.response
        })
    }
    else {
        res.send("Please Login to continue");
    }
});
router.get('/getMedicine', async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getMedicine();
        res.status(result.status).json({
            data: result.response
        })
    }
    else {
        res.send("Please Login to continue");
    }
});
router.get('/getDisease', async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getDisease();
        res.status(result.status).json({
            data: result.response
        })
    }
    else {
        res.send("Please Login to continue");
    }
});
router.get('/getWard', async (req, res) => {

    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getWard();
        res.status(result.status).json({
            data: result.response
        })
    }
    else {
        res.send("Please Login to continue");
    }
});
router.get('/getBloodRequest', async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getBloodRequest();
        res.status(result.status).json({
            data: result.response
        })
    }
    else {
        res.send("Please Login to continue");
    }
});
router.get('/getDoctor',async (req,res)=>{
    let admin= new Admin();
    let result = await admin.getDoctor();
    res.status(result.status).json({
        data: result.response
    })
});
router.get('/getAppointment', async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getAppointment();
        res.status(result.status).json({
            data: result.response
        });
    }
    else {
        res.send("Please Login to continue");
    }
})
router.get('/getHomeService', async (req, res) => {
    if (req.session.admin) {
        let admin = new Admin();
        let result = await admin.getHomeService();
        res.status(result.status).json({
            data: result.response
        });
    }
    else {
        res.send("Please Login to continue");
    }
})
router.get('/logout', (req, res)=> {
    if(req.session.admin) {
        req.session.destroy();
        res.locals.info = null;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/adminLogin.ejs'));
    }
});
module.exports = router;