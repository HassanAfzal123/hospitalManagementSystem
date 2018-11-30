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
        res.render(path.join(__dirname,'../','views/layouts/AddStaffPage.hbs'));
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
router.post('/',function(req,res){
    if(req.session.staff){
        let hashPass = bcrypt.hashSync(req.body.staff_password);
        let staff_email_info = {
            email: req.body.staff_email,
            password: hashPass,
            USER_ROLE_role_id: 2
        };

        db.connection.beginTransaction(function(error) {
            if (error) throw error;

            let Insert_Staff_user_info = "INSERT INTO USER_INFO SET ?";

            db.connection.query(Insert_Staff_user_info, [staff_email_info], function (err1) {
                console.log(err1);
                if (err1) {
                    return db.connection.rollback(function() {

                        if (err1.errno == 1062) {
                            res.send("Staff email already exists !");
                        }
                        else{
                            res.send("Error: Wrong or Incomplete information provided !");
                        }
                    });
                }
                else {
                    let newStaff_id = "SELECT info_id FROM USER_INFO where email = ?";
                    db.connection.query(newStaff_id,[req.body.staff_email],function(err2,staff_id){
                        console.log(staff_id);
                        if(err2){
                            return db.connection.rollback(function(){
                               res.send("No such Staff exists");
                            });
                        }
                        else{
                            let staff_details = {
                                name: req.body.staff_name,
                                cell_no: req.body.staff_number,
                                cnic_no: req.body.staff_cnic,
                                gender: req.body.staff_gender,
                                USER_INFO_info_id: staff_id[0].info_id
                        };
                            let Insert_staff_details = "INSERT INTO STAFF SET ?";
                            db.connection.query(Insert_staff_details,[staff_details],function(err3){
                                if(err3) {
                                    if (err2.errno === 1062) {
                                        res.send("Staff CNIC/PhoneNumber already exists.");
                                    }
                                }
                                else if (!(err1 && err2)) {
                                    db.connection.commit(function (rollback_err) {
                                        if (rollback_err) {
                                            return db.connection.rollback(function () {

                                                throw rollback_err;
                                            });
                                        }
                                        else {
                                            res.send("Staff Created Successfully !");
                                        }
                                    });
                                }
                                else{
                                    res.send("Error Creating Staff. Please try again with different details");
                                }


                            });
                  }
                    });
                }
            });
        });
    }
    else{
        res.send("You are not logged in as Staff !");
    }
});
module.exports = router;