var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
const db = require('../database');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'../','public')));
/* GET users listing. */
router.get('/',function(req,res){
    if(req.session.staff){
        let get_staff_table = "SELECT name,cell_no,cnic_no,gender FROM STAFF";
        let all_staff_info = {};
        db.connection.query(get_staff_table,function(err,result){
            if(!result){
                res.send("There are no staff added at the moment");
            }
            else if(err){
                res.send("There is something wrong with this page, please come back later on");
            }
            else{
                console.log(result);
                for(var i=0;i<result.length;i++){
                    all_staff_info[i] = {
                        name: result[i].name,
                        cell_no: result[i].cell_no,
                        gender: result[i].gender,
                        cnic_no: result[i].cnic_no
                    }
                }
                res.render(path.join(__dirname,'../','views/layouts/ListStaffPage.hbs'),{staff_details: all_staff_info});
            }
        })
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
module.exports = router;