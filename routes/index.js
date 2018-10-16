const express = require('express');
const path = require('path');
<<<<<<< HEAD
const reqapp = require('../database');
=======
const db = require('../database');
>>>>>>> 6a1de9c95e0f6225ac05433c829236ff32648062
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
/* GET home page.*/
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','Views/index.html'));
});
router.post('/recipt', function(req, res, next) {
    var reportid = req.body.reportid;
    var queryString = 'SELECT * FROM reports WHERE reportId=?';

<<<<<<< HEAD
    reqapp.connection.query(queryString, reportid, function(err, result) {
        try{
            res.sendFile(path.join(__dirname, '../', result[0].resultAddress + ".pdf"));
        }
        catch(err){
            res.send("WRONG ID");
=======
    db.connection.query(queryString, reportid, function(err, rows, fields) {
        if (err) throw err;

        for(i in rows){
          res.send("Name: "+rows[i].name+ "<br>TestName: "+rows[i].testName+"<br>Test Result: "+rows[i].result);
>>>>>>> 6a1de9c95e0f6225ac05433c829236ff32648062
        }

    });
});

module.exports = router;
