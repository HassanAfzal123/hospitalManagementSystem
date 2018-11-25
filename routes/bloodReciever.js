const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    var queryString="SELECT * from donateblood";
    var obj = {};
    db.connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;

        for(var i=0;i<rows.length;i++){
            obj[i]={name: rows[i].donorname,number: rows[i].donornumber,email: rows[i].donoremail,blood: rows[i].bloodgroup};
        }
        res.render(path.join(__dirname,'../','views/layouts/RequestBlood'),{objects: obj});
    });
});

module.exports = router;