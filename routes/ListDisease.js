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
        let get_disease_table = "SELECT name,details,symptoms FROM DISEASE";
        let all_disease_info = {};
        db.connection.query(get_disease_table,function(err,result){
            if(!result){
                res.send("There are no Disease added at the moment");
            }
            else if(err){
                res.send("There is something wrong with this page, please come back later on");
            }
            else{
                console.log(result);
                for(var i=0;i<result.length;i++){
                    all_disease_info[i] = {
                        name: result[i].name,
                        description: result[i].details,
                        symptoms: result[i].symptoms
                    }
                }
                res.render(path.join(__dirname,'../','views/layouts/ListDiseasePage.hbs'),{disease_details: all_disease_info});
            }
        })
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
module.exports = router;