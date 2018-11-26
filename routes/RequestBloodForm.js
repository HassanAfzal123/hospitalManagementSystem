const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    if(req.session.user) {
        let get_old_request = "SELECT P.first_name,P.last_name,P.cell_no,B.BLOOD_GROUP,B.Status FROM PATIENT P,BLOOD_REQUEST B where P.patient_id = B.PATIENT_patient_id AND B.PATIENT_patient_id = ?";
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
                            bloodgroup: patient_info[i].BLOOD_GROUP,
                            status: patient_info[i].Status,
                            showColor: true
                        };
                    }
                    else{
                        patient_data[i] = {
                            first_name: patient_info[i].first_name,
                            last_name: patient_info[i].last_name,
                            number: patient_info[i].cell_no,
                            bloodgroup: patient_info[i].BLOOD_GROUP,
                            status: patient_info[i].Status,
                            showColor: false
                        };
                    }
                }
                res.render(path.join(__dirname,'../','views/layouts/requestblood.hbs'),{patient_request: patient_data});
            }
        });
    }
    else{
        res.locals.info = "You need to login first!";
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }
});
router.post('/submitForm',function(req,res){
    if(req.session.user) {
        // CHECK STATUS OF OLD REQUEST
        let check_old_status = 0;
        const Check_Old_Req_Status = "SELECT Status FROM BLOOD_REQUEST where PATIENT_patient_id = ?";
        db.connection.query(Check_Old_Req_Status,[req.session.user],function (err1,resultStatus) {
            if(err1){
                res.send("There's something wrong, please come back later !");
            }
            else{
                resultStatus.forEach(req_status=>{
                   if(req_status.Status == 'PENDING'){
                       check_old_status = 1;
                   }
                });

                // INSERT NEW REQUEST IF ALL OLD ONES ARE PROCESSED
                if(check_old_status == 0) {
                    const req_form_info = {BLOOD_GROUP: req.body.donorbloodGroup, PATIENT_patient_id: req.session.user};
                    const InsertPatientRequest_query = "INSERT INTO BLOOD_REQUEST SET ? ";

                    db.connection.query(InsertPatientRequest_query, [req_form_info], function (err2, rows, fields) {
                        if (err2) {
                            res.send("Error in submitting your request");
                        }
                        else {
                            res.send("Thank you for your Blood donation Request. You'll be shortly contacted by someone who needs it.");
                        }


                    });
                }
                else{
                    res.send("Sorry, you already have an Ongoing Blood request");
                }
            }
        });


    }
    else{
        res.locals.info = "You need to login first!";
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }

});
module.exports = router;