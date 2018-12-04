//FOR STAFF

var express = require('express');
const path = require('path');
var multer  =   require('multer');
var db = require('../database');

const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));

var reportid;
/* GET ADD Labortary Reports page.*/
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../','views/layouts/uploadReport.hbs'));
});
var random;
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};
var storage = multer.diskStorage(
    {
        destination: './public/uploads/',
        filename: function ( req, file, cb ) {

            cb( null, random +".pdf");
        }
    }
);
var upload = multer({ storage: storage});
router.post('/submit',upload.any('file'),function(req, res, next) {
    var fileaddress = './public/uploads/'+random;
    var queryString = "INSERT INTO LABORTORY_REPORT SET ?";
    var Insert_Report_Data = {stored_path: fileaddress, test_name: req.body.testname, PATIENT_patient_id: req.body.patientid};
    random = ID();
    db.connection.query(queryString,[Insert_Report_Data], function(err) {
        if(err) {

            if (err.errno == 1216) {
                res.send("No such patient found");
            }

            else{
                console.log(err);
                throw err;
            }
        }
        else {
            res.send("File Uploaded Successfully");
        }

    });
});




module.exports = router;