const express = require('express');
const path = require('path');
const reqapp = require('../app');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
/* GET home page.*/
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','Views/index.html'));
});
<<<<<<< HEAD
router.post('/recipt', function(req, res, next) {
    var reportid = req.body.reportid;
    var queryString = 'SELECT * FROM reports WHERE id=?';
    console.log(reportid);

    reqapp.connection.query(queryString, reportid, function(err, rows, fields) {
        if (err) throw err;

        for(i in rows){
          res.send("Name: "+rows[i].name+ "<br>TestName: "+rows[i].testName+"<br>Test Result: "+rows[i].result);
        }


    });
});
=======
>>>>>>> 2515514c54a1f245d0f435db01f9f4eb3e915af5

module.exports = router;
