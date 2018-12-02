const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    const blood_status = "PENDING";
    var get_blood_req="SELECT B.BLOOD_GROUP,P.first_name,P.last_name,P.cell_no,U.email,B.Status from BLOOD_REQUEST B,PATIENT P, USER_INFO U where B.PATIENT_patient_id = P.patient_id AND U.info_id = P.USER_INFO_info_id AND B.Status != ?";
    var person_info = {};
    const res_empty_message = "There are no Blood Requests at the moment !";
    db.connection.query(get_blood_req,[blood_status],function(err, request_blood_person, fields) {
        if (err){
            res.send("There is something wrong, please come back later on !");
        }
        else {
            if(request_blood_person.length != 0) {
                for (var i = 0; i < request_blood_person.length; i++) {
                    person_info[i] = {
                        first_name: request_blood_person[i].first_name,
                        last_name: request_blood_person[i].last_name,
                        blood: request_blood_person[i].BLOOD_GROUP,
                        email: request_blood_person[i].email,
                        number: request_blood_person[i].cell_no
                    };
                }
                res.render(path.join(__dirname, '../', 'views/layouts/ShowBloodRequest.hbs'), {objects: person_info});
            }
            else{
                res.render(path.join(__dirname, '../', 'views/layouts/ShowBloodRequest.hbs'), {res_empty_message: res_empty_message});
            }
        }
    });
});

module.exports = router;