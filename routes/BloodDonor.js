var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
const db = require('../database');
const bcrypt = require('bcryptjs');
router.use(express.static(path.join(__dirname,'../','public')));
router.post('/',function(req,res){
    db.connection.beginTransaction(function(err){
        if(err){
            throw err;
        }
        else{
            let donorInfo = {
                name: req.body.donorName,
                number: req.body.donorNumber
            };
            let insertDonor = "INSERT INTO BLOOD_DONOR SET ?";
            db.connection.query(insertDonor,[donorInfo],function (insertDonorErr) {
                if(insertDonorErr){
                    db.connection.rollback(function () {
                        console.log(insertDonorErr);
                        res.send("You cannot donate right now, please try later on !");
                    });
                }
                else{
                    let getDonorId = "SELECT donor_id FROM BLOOD_DONOR where name = ? AND number = ?";
                    db.connection.query(getDonorId,[req.body.donorName,req.body.donorNumber],function(getDonorIdErr,donorID){
                        if(getDonorIdErr){
                            db.connection.rollback(function () {
                                res.send("You cannot donate right now, please try later on !");
                            });
                        }
                        else{
                            let setDonorToRequester = "UPDATE BLOOD_REQUEST SET BLOOD_DONOR_donor_id = ? where blood_request_id = ?";
                            db.connection.query(setDonorToRequester,[donorID[0].donor_id,req.body.requester_id],function (setDonorToRequesterErr) {
                                if(setDonorToRequesterErr){
                                    db.connection.rollback(function () {
                                        res.send("You cannot donate right now, please try later on !");
                                    })
                                }
                                else{
                                    db.connection.commit(function (commit_err) {
                                       if(commit_err){
                                           db.connection.rollback(function () {
                                               res.send("You cannot donate right now, please try later on !");
                                           })
                                       }
                                       else{
                                           res.send("Thank you for your Blood Donation. Your Donation request has been submitted. You will be contacted soon!");
                                       }
                                    });
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});
module.exports = router;