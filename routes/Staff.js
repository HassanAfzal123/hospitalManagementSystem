var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
const db = require('../database');
const bcrypt = require('bcryptjs');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'../','public')));
const Staff = require('../Models/staff');
const Ward = require('../Models/ward');
const Disease = require('../Models/disease');
/* GET users listing. */
router.get('/home', function(req, res, next) {
    if(req.session.staff) {
        let queryString = "SELECT U.email,S.name,S.cnic_no,S.cell_no,S.gender FROM STAFF S, USER_INFO U where S.USER_INFO_info_id = U.info_id AND S.staff_id = ?";
        db.connection.query(queryString, [req.session.staff], function (err, result) {
            if (err) {
                throw err;
            }
            else {
                res.render(path.join(__dirname, '../', 'views/layouts/Staffdashboard.hbs'), {staff: result[0]});
            }
        });
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
router.post('/update', function (req,res,next) {
    if(req.session.staff) {
        let queryString = "UPDATE STAFF SET ? where STAFF.staff_id = ?";
        let newStaff_info = {name: req.body.newName};
        db.connection.query(queryString, [newStaff_info, req.session.staff], function (err2, rows, fields) {
            if (err2) {
                throw err2;
            }
            else {

                res.redirect('/Staff/home');

            }
        });
    }
    else{
        res.send("You are not logged in as Staff");
    }
});
router.post('/changepass', function (req,res,next) {
    if(req.session.staff){
        var hash = bcrypt.hashSync(req.body.newPassword,1);
        let queryString = "UPDATE USER_INFO SET ? where info_id = (SELECT USER_INFO_info_id FROM STAFF where staff_id = ?)";
        let newUser_Pass = {password: hash};
        console.log(newUser_Pass);
        db.connection.query(queryString,[newUser_Pass,req.session.staff],function(err2,rows,fields) {
           req.session.destroy();
            if(err2){
                res.locals.info = "Password wasn't updated successfully, kindly use your old password for login.";
                res.locals.success = null;
                res.render(path.join(__dirname, '../', 'views/login.ejs'));
            }
            else {
                res.locals.info = null;
                res.locals.success = "Password Updated Successfully. You can now login with your new password !";
                res.render(path.join(__dirname, '../', 'views/login.ejs'));

            }
        });
    }
});
router.get('/addDisease', function(req, res, next) {
    if(req.session.staff) {
        res.render(path.join(__dirname,'../','views/layouts/AddDiseasePage.hbs'));
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
router.post("/addDisease", async (req, res) => {
    let staff = new Staff();
    console.log(req.body)
    let disease = new Disease(req.body.name,req.body.description,req.body.symptoms);
    let result = await staff.addDisease(disease);
    res.status(result.status).json({
        response: result.response
    })
});
router.get('/addMedicine', function(req, res, next) {
    if(req.session.staff) {
        res.render(path.join(__dirname,'../','views/layouts/AddMedicinePage.hbs'));
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
router.post("/addMedicine", async (req, res) => {
    let staff = new Staff();
    let medicine = new medicine(req.body.medicine,req.body.company);
    let result = await staff.addMedicine(medicine);
    res.status(result.status).json({
        response: result.response
    })
});
router.get('/logout', function(req, res, next) {
    if(req.session.staff) {
        req.session.destroy();
        res.locals.info = null;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }
});
module.exports = router;