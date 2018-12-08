const express = require('express');
const path = require('path');
//const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../','views/chatbot.html'));
});

module.exports = router;