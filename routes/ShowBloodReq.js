const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    var get_blood_req="SELECT B.BLOOD_GROUP,P.first_name,P.last_name,P.cell_no,U.email from BLOOD_REQUEST B,PATIENT P, USER_INFO U where B.PATIENT_patient_id = P.patient_id AND U.info_id = P.USER_INFO_info_id";
    var person_info = {};
    db.connection.query(get_blood_req, function(err, request_blood_person, fields) {
        if (err) throw err;

        for(var i=0;i<request_blood_person.length;i++){

                person_info[i]={first_name: request_blood_person[i].first_name,last_name: request_blood_person[i].last_name,blood: request_blood_person[i].BLOOD_GROUP,email: request_blood_person[i].email, number: request_blood_person[i].cell_no};

        }

        res.render(path.join(__dirname,'../','views/layouts/ShowBloodRequest.hbs'),{objects: person_info});
    });
});

module.exports = router;