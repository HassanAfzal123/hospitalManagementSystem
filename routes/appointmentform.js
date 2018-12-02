const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));

router.get('/', function(req, res) {
    if(req.session.user) {
        let get_old_request = "SELECT M.name,M.date,M.time,M.Status,P.cell_no FROM APPOINTMENT M, PATIENT P where M.PATIENT_patient_id = P.patient_id AND M.PATIENT_patient_id = ?";
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
                            name: patient_info[i].name,
                            number: patient_info[i].cell_no,
                            date: patient_info[i].date,
                            time: patient_info[i].time,
                            status: patient_info[i].Status,
                            showColor: true
                        };
                    }
                    else{
                        patient_data[i] = {
                            name: patient_info[i].name,
                            number: patient_info[i].cell_no,
                            date: patient_info[i].date,
                            time: patient_info[i].time,
                            status: patient_info[i].Status,
                            showColor: false
                        };
                    }
                }
                res.render(path.join(__dirname,'../','views/layouts/makeappointment.hbs'),{appointment_request: patient_data});
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
        var check = 0;
        let Check_Last_Status = "SELECT Status FROM APPOINTMENT where PATIENT_patient_id = ?";
        db.connection.query(Check_Last_Status,[req.session.user],function (error,result) {
            if(error){
                res.send("There are some issues. Please come back later");
            }
            else{
                result.forEach(element=>{
                    if(element.Status == 'PENDING'){
                        check = 1;
                    }
                });

                // INSERT NEW REQUEST IF OLD ONE IS NOT ON PENDING
                if(check == 0) {
                    var Insert_Appointment_Details = "INSERT INTO APPOINTMENT SET ?";
                    var information = {
                        name: req.body.name,
                        date: req.body.date,
                        time: req.body.time,
                        PATIENT_patient_id: req.session.user
                    };
                    db.connection.query(Insert_Appointment_Details, [information], function (err, rows, fields) {
                        if (err) {
                            res.send("There is some problem, please come back later !");
                        }
                        else {
                            res.send("Thank You. Your appointment is registered. You'll receive a confirmation call very soon !");
                        }
                    });
                }
                else{
                    res.send("You already have an ongoing PENDING appointment.");
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