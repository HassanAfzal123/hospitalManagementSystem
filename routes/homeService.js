const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));

router.get('/', function(req, res) {
    if(req.session.user) {
        let get_old_request = "SELECT P.first_name,P.last_name,P.cell_no,H.description,H.Status FROM PATIENT P,HOME_SERVICE H where P.patient_id = H.PATIENT_patient_id AND H.PATIENT_patient_id = ?";
        const patient_data={};
        var i;
        db.connection.query(get_old_request,[req.session.user],function (err,patient_info) {
            if(err){
                res.sendStatus(404);
            }
            else{
                for(i=0;i<patient_info.length;i++){
                    if(patient_info[i].Status == 'PENDING') {
                        patient_data[i] = {
                            first_name: patient_info[i].first_name,
                            last_name: patient_info[i].last_name,
                            number: patient_info[i].cell_no,
                            description: patient_info[i].description,
                            status: patient_info[i].Status,
                            showColor: true
                        };
                    }
                    else{
                        patient_data[i] = {
                            first_name: patient_info[i].first_name,
                            last_name: patient_info[i].last_name,
                            number: patient_info[i].cell_no,
                            description: patient_info[i].description,
                            status: patient_info[i].Status,
                            showColor: false
                        };
                    }
                }
                res.render(path.join(__dirname,'../','views/layouts/HomeService.hbs'),{patient_request: patient_data});
            }
        });
    }
    else{
        res.locals.info = "You need to login first!";
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
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