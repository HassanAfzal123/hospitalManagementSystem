const express = require('express');
const path = require('path');
//const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../','Views/donateBlood.html'));
});
router.post('/submitForm',function(req,res){
    
});
module.exports = router;