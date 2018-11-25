const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    if(req.session.user) {
        res.render(path.join(__dirname,'../','views/layouts/requestblood.hbs'));
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
                   if(req_status.Status === 'PENDING'){
                       check_old_status = 1;
                   }
                });

                // INSERT NEW REQUEST IF ALL OLD ONES ARE PROCESSED
                if(check_old_status === 0) {
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