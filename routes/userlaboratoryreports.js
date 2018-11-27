const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    if(req.session.user) {
        let get_patient_report = "SELECT P.first_name,P.last_name,R.stored_path,R.test_name FROM PATIENT P, LABORTORY_REPORT R where P.patient_id = R.PATIENT_patient_id AND R.PATIENT_patient_id = ?";
        const laboratory_reports={};
        db.connection.query(get_patient_report,[req.session.user],function (err,patient_report) {
            if(err){
                res.send(404);
            }
            else{
                for(var i=0;i<patient_report.length;i++){
                    laboratory_reports[i] = {
                        first_name: patient_report[i].first_name,
                        last_name: patient_report[i].last_name,
                        reportlink: patient_report[i].stored_path,
                        testName: patient_report[i].test_name

                    }
                }
                console.log(laboratory_reports);
                res.render(path.join(__dirname, '../', 'views/layouts/userlaboratoryrequest.hbs'), {laboratory_reports: laboratory_reports});
            }

        });
    }
    else{
        res.locals.info = "You need to login first!";
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/login.ejs'));
    }
});
router.post('/openlink',function(req,res){
   if(req.session.user){
       res.sendFile(path.join(__dirname, '../', req.body.reportpath + ".pdf"));
   }
});

module.exports = router;