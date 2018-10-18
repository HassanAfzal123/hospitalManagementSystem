const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../','Views/RequestBlood.html'));
    //res.json("HELLO");
});

module.exports = router;