const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    var asd=123;
    res.render(path.join(__dirname,'../','Views/layouts/RequestBlood'),{title: asd});
});

module.exports = router;