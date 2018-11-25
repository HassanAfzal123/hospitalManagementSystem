const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../','views/appointment.html'));
});
router.post('/submit', function(req, res) {

    var queryString="INSERT INTO appointmentrequest SET ?";
    var valuesarr = {fname: req.body.fname, lname: req.body.lname, email: req.body.email,city: req.body.city,address1: req.body.address1, address2: req.body.address2,state: req.body.state, contact: req.body.contact};
    db.connection.query(queryString,[valuesarr],function(err, rows, fields) {
        try{
            res.send("Your information has been submitted successfully. You will be contacted very soon.");
        }
        catch(err){
            res.send("Wrong info provided");
        }
    });
});

module.exports = router;