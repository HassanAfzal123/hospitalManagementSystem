const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));

router.get('/', function(req, res) {
    if(req.session.user) {
        res.render(path.join(__dirname,'../','Views/layouts/HomeService.hbs'));
    }
    else{
        res.send("Please login first !!");
    }
});
router.post('/submit', function(req, res) {
    if(req.session.user) {
        var queryString = "INSERT INTO HOME_SERVICE SET ?";
        var valuesarr = {
            description: req.body.descriptionbox,
            PATIENT_patient_id: req.session.user
        };
        db.connection.query(queryString,[valuesarr], function (err) {
            if (err) {
                console.log(err);
                res.send("You have already requested for Home Service. You can view it in your profile overview");
            }
            else {
                res.send("Your information has been submitted successfully. You will be contacted very soon.");
            }
        });
    }
    else{
        res.send("You are not logged in !");
    }
});

module.exports = router;