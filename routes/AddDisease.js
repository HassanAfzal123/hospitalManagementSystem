var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
const db = require('../database');
const bcrypt = require('bcryptjs');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'../','public')));
/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.staff) {
        res.render(path.join(__dirname,'../','views/layouts/AddDiseasePage.hbs'));
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
router.post('/',function(req,res){
    if(req.session.staff) {
        let insert_Disease = "INSERT INTO DISEASE SET ?";
        let disease_info = {
            name: req.body.disease_name,
            details: req.body.Ddescriptionbox,
            symptoms: req.body.symptoms
        };
        db.connection.query(insert_Disease,[disease_info],function(err){
            if(err){
                if(err.errno == 1062){
                    res.send("Disease already exists !");
                }
                else{
                    throw err;
                }
            }
            else{
                res.send("Disease registered successfully !");
            }
        })
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
module.exports = router;