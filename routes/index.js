const express = require('express');
const path = require('path');
const reqapp = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
/* GET home page.*/
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','Views/index.html'));
});
router.post('/recipt', function(req, res, next) {
    var reportid = req.body.reportid;
    var queryString = 'SELECT * FROM reports WHERE reportId=?';

    reqapp.connection.query(queryString, reportid, function(err, result) {
        try{
            res.sendFile(path.join(__dirname, '../', result[0].resultAddress + ".pdf"));
        }
        catch(err){
            res.send("WRONG ID");
        }

    });
});

module.exports = router;
