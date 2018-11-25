var express = require('express');
var formidable = require('formidable');
const path = require('path');
var multer  =   require('multer');
var db = require('../database');

const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
/* GET ADD Labortary Reports page.*/
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../','views/labortaryreports.html'));
});

var storage = multer.diskStorage(
    {
        destination: './public/uploads/',
        filename: function ( req, file, cb ) {

            cb( null, req.body.reportidfield+".pdf");
        }
    }
);

var upload = multer({ storage: storage});
router.post('/submit',upload.any('file'),function(req, res, next) {
    var reportid = req.body.reportidfield;
    var testname = req.body.testName;
    var fileaddress = './public/uploads/'+req.body.reportidfield;
    var queryString = "INSERT INTO reports SET ?";
    var valuesarray = {reportId: reportid, testName: testname, resultAddress: fileaddress};
    db.connection.query(queryString,[valuesarray], function(err, rows, fields) {
        if (err) throw err;

    });
    res.send("File Saved Successfully!");
});



module.exports = router;