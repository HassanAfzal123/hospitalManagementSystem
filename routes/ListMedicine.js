var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
const db = require('../database');
const bcrypt = require('bcryptjs');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'../','public')));
/* GET users listing. */
router.get('/',function(req,res){
    if(req.session.staff){
        let get_medicine_table = "SELECT name,company FROM MEDICINE";
        let all_medicine_info = {};
        db.connection.query(get_medicine_table,function(err,result){
            if(!result){
                res.send("There are no Medicine added at the moment");
            }
            else if(err){
                res.send("There is something wrong with this page, please come back later on");
            }
            else{
                console.log(result);
                for(var i=0;i<result.length;i++){
                    all_medicine_info[i] = {
                        name: result[i].name,
                        company: result[i].company
                    }
                }
                res.render(path.join(__dirname,'../','views/layouts/ListMedicinePage.hbs'),{medicine_details: all_medicine_info});
            }
        })
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
module.exports = router;