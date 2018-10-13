const express = require('express');
const path = require('path');
const reqapp = require('../app');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
/* GET login page.*/
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../','Views/login.html'));
});
router.post('/authenticate', function(req, res, next) {
    var queryString = 'SELECT * FROM UserInfo';
    reqapp.connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;

        for (var i in rows) {
            if(rows[i].email == req.body.email && rows[i].password == req.body.password){
                console.log("User Found !");
            }
        }
    });
});

module.exports = router;
