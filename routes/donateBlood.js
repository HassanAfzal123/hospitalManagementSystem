const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
router.use(express.static(path.join(__dirname,'../','public')));
router.get('/', function(req, res) {
    if(req.session.user) {
        res.render(path.join(__dirname,'../','views/layouts/donateblood.hbs'));
    }
    else{
        res.send("Please login first !!");
    }
});
router.post('/submitForm',function(req,res){
    var donorname = req.body.donorname;
    var donoremail = req.body.donoremail;
    var donornumber = req.body.donorcontact;
    var donorbloodgroup = req.body.donorbloodGroup;

    var queryString = "INSERT INTO donateblood SET ?";
    var valuesarray = {donoremail: donoremail, donorname: donorname, donornumber: donornumber,bloodgroup: donorbloodgroup};
    db.connection.query(queryString,[valuesarray], function(err, rows, fields) {
        if (err) throw (err);
        try{
            res.send("Thank you for your Blood donation Request. You'll be shortly contacted by someone who needs it.");
        }
        catch(err) {
            res.send("Error in submitting your request");
        }
    });

});
module.exports = router;