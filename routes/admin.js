const express = require('express');
const path = require('path');
const db = require('../database');
const http = require('http');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../', 'public')));
const passport = require('passport');
const bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
    if (!req.session.user) {
        res.locals.info = null;
        res.locals.success = null;
        res.render(path.join(__dirname, '../', 'views/adminLogin.ejs'));
    }
    else {
        res.redirect('/admin/home');
    }
});
router.post('/login', function (req, res, next) {
    let userid;
    passport.authenticate("local-admin", function (err, user, info) {
        if (err) {
            res.locals.info = "Error logging in.";
            res.locals.success = null;
            res.render(path.join(__dirname, '../', 'views/adminLogin.ejs'));
        }
        if (user) {
            let queryString = "SELECT admin_id from ADMIN A,USER_INFO U where U.info_id = A.USER_INFO_info_id AND U.email = ?";
            db.connection.query(queryString, [req.body.email], function (err, result, fields) {
                if (err) {
                    res.send("No such user found");
                }
                else {
                    req.session.user = result[0].patient_id;
                    res.redirect('/admin/home');
                }
            });
        } else {
            res.locals.info = info.message;
            res.locals.success = null;
            res.render(path.join(__dirname, '../', 'views/login.ejs'));
        }
    })(req, res, next);
});
router.post('/addAdmin', function (req, res) {
    var hash = bcrypt.hashSync(req.body.password, 1);
    let userInfo = { email: req.body.email, password: hash, USER_ROLE_role_id: 1 };
    let email = req.body.email;
    let insertUserInfo = " Insert into USER_INFO set ?";
    db.connection.beginTransaction(function (error) {
        if (error) throw error;

        db.connection.query(insertUserInfo, [userInfo], function (err1, rows1, fields1) {
            if (err1) {
                return db.connection.rollback(function () {
                    if (err1.errno == 1062) {
                        // res.locals.info = "Admin email already exists";
                        // res.locals.success = null;
                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                        res.send('cannot create admin');
                    }
                    else if (err2.errno === 1048) {
                        // res.locals.info = "All values are required";
                        // res.locals.success = null;
                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                        res.send("All values are required");
                    }
                })
            }
            else {

                let selectUserInfo = "SELECT info_id from USER_INFO where email = ?";

                db.connection.query(selectUserInfo, [email], (err, result) => {
                    if (err) {
                        return db.connection.rollback(function () {
                            res.send("rollback");
                        });
                    }
                    else {
                        let insertAdmin = " Insert into ADMIN set ?";
                        let id = result[0].info_id;
                        let adminData = {
                            name: req.body.name,
                            cell_no: req.body.cell_no,
                            cnic_no: req.body.cnic_no,
                            gender: req.body.gender,
                            USER_INFO_info_id: id
                        };
                        db.connection.query(insertAdmin, [adminData], (err2, result) => {
                            if (err2) {
                                db.connection.rollback(function () {
                                    if (err2.errno === 1062) {
                                        // res.locals.info = "Contact number already exists";
                                        // res.locals.success = null;
                                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                                        res.send("Contact number already exists");
                                    }
                                    else if (err2.errno === 1048) {
                                        // res.locals.info = "All values are required";
                                        // res.locals.success = null;
                                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                                        res.send("All values are required");
                                    }
                                    else {
                                        res.send("Error adding admin")
                                    }
                                });
                            }
                            else if (!(err1 && err2)) {
                                db.connection.commit((rollback_err) => {
                                    if (rollback_err) {
                                        return db.connection.rollback(function () {
                                            //throw rollback_err;
                                            //console.log(rollback_err);
                                            res.send("Error creating admin");
                                        });
                                    }
                                    else {
                                        // res.locals.success = "User successfully created Please sign in to continue";
                                        // res.locals.info = null;
                                        //res.render(path.join(__dirname, '../', 'views/login.ejs'))
                                        res.send("Admin successfully created Please sign in to continue")
                                    }
                                })
                            }

                            else {
                                res.locals.info = "Error creating user";
                                res.locals.success = null;
                                //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                                res.send("Error creating admin");

                            }
                        })
                    }
                })
            }
        })
    })
});
router.post('/addStaff', function (req, res) {
    var hash = bcrypt.hashSync("password", 1);
    let userInfo = { email: req.body.email, password: hash, USER_ROLE_role_id: 1 };
    let email = req.body.email;
    let insertUserInfo = " Insert into USER_INFO set ?";
    db.connection.beginTransaction( (error)=> {
        if (error) throw error;
        db.connection.query(insertUserInfo, [userInfo], (err1, rows1, fields1) =>{
            if (err1) {
                return db.connection.rollback(function () {
                    if (err1.errno == 1062) {
                        res.locals.info = "User email already exists";
                        res.locals.success = null;
                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                        res.send('cannot create user');
                    }
                    else if (err2.errno === 1048) {
                        res.locals.info = "All values are required";
                        res.locals.success = null;
                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                        res.send("All values are required");
                    }
                })
            }
            else {

                let selectUserInfo = "SELECT info_id from USER_INFO where email = ?";
                db.connection.query(selectUserInfo, [email], function (err, result) {
                    if (err) {
                        return db.connection.rollback(function () {
                            res.send("rollback");
                        });
                    }
                    else {
                        let insertStaff = " Insert into STAFF set ?";
                        let id = result[0].info_id;
                        let staffData = {
                            name: req.body.name,
                            cell_no: req.body.cell_no,
                            cnic_no: req.body.cnic_no,
                            gender: req.body.gender,
                            USER_INFO_info_id: id
                        };
                        db.connection.query(insertStaff, [staffData], function (err2, result) {
                            if (err2) {
                                db.connection.rollback(function () {
                                    if (err2.errno === 1062) {
                                        // res.locals.info = "Contact number already exists";
                                        // res.locals.success = null;
                                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                                        res.send("Contact number already exists");
                                    }
                                    else if (err2.errno === 1048) {
                                        // res.locals.info = "All values are required";
                                        // res.locals.success = null;
                                        //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                                        res.send("All values are required");
                                    }
                                });
                            }
                            else if (!(err1 && err2)) {
                                db.connection.commit(function (rollback_err) {
                                    if (rollback_err) {
                                        return db.connection.rollback(function () {
                                            console.log(rollback_err);
                                            res.send("Error creating staff");
                                        });
                                    }
                                    else {
                                        // res.locals.success = "Staff successfully created Please sign in to continue";
                                        // res.locals.info = null;
                                        //res.render(path.join(__dirname, '../', 'views/login.ejs'))
                                        res.send("Staff successfully created Please sign in to continue")
                                    }
                                });
                            }

                            else {
                                // res.locals.info = "Error creating user";
                                // res.locals.success = null;
                                //res.render(path.join(__dirname, '../', 'views/login.ejs'));
                                res.send("Error creating staff");

                            }
                        });
                    }
                })
            }
        })
    })
});
router.post("/addWard", (req, res) => {
    db.connection.beginTransaction((error) => {
        if (error) {
            res.send("error");
        }
        else {
            let wardData = {
                name: req.body.name,
                bed_count: req.body.bedCount,
                class: req.body.class
            }
            let insertWard = "Insert into WARD set ?";
            db.connection.query(insertWard, [wardData], (insertWardError) => {
                if (insertWardError) {
                    return res.send("Insert ward error");
                }
                else {
                    let selectWardId = "Select ward_id from WARD where name = ?";
                    db.connection.query(selectWardId, [req.body.name], (selectWardError, result) => {
                        if (selectWardError) {
                            return db.connection.rollback(function () {
                                return res.send("rollback");
                            });
                        }
                        else {
                            let bedData = { WARDS_ward_id: result[0].ward_id };
                            let i = 0;
                            set(0);
                            function set(i) {
                                let insertBed = "Insert into BED set ?";
                                db.connection.query(insertBed, [bedData], (insertBedError, result) => {
                                    if (insertBedError) {
                                        return db.connection.rollback(function () {
                                            return res.send("rollback");
                                        });
                                    }
                                })
                                if (i < req.body.bedCount)
                                    set(i + 1);
                                else {
                                    db.connection.commit((rollback_err) => {
                                        if (rollback_err) {
                                            return db.connection.rollback(function () {
                                                res.send(rollback_err);
                                            });
                                        }
                                        else {
                                            // res.locals.success = "User successfully created Please sign in to continue";
                                            // res.locals.info = null;
                                            // res.render(path.join(__dirname, '../', 'views/login.ejs'))
                                            res.send("success");
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }
    })
});
router.post("/addDisease", (req, res) => {
    let disease = {
        name :req.body.name,
        details:req.body.symptomps,
        symptoms:req.body.symptoms
    };
    let insertDisease="Insert into DISEASE set ?";
    db.connection.query(insertDisease, [disease], (insertDiseaseError, result) => {
        if(insertDiseaseError){
            res.send("error");
        }
        else{
            res.send("Successfully inserted");
        }
    })
});
module.exports = router;