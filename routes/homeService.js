const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../','Views/homeservice.html'));
});
router.post('/submit', function(req, res) {

    var queryString="INSERT INTO homeservicereq SET ?";
    var valuesarr = {fname: req.body.h_fname, lname: req.body.h_lname, email: req.body.h_email,city: req.body.h_city,address1: req.body.h_address1, address2: req.body.h_address2,state: req.body.h_state, contact: req.body.h_contact};
    db.connection.query(queryString,[valuesarr],function(err, rows, fields) {
        if(err){
            res.send("Wrong info provided");
        }
        res.send("Your information has been submitted successfully. You will be contacted very soon.");
    });
});

module.exports = router;