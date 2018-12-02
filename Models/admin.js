const WorkForce = require('./workforce.js');
module.exports = class Admin extends WorkForce {
    constructor(name, cellNo, cnicNo, gender) {
        super(name, cellNo, cnicNo, gender);
    }

    addStaff(staff, userInfo) {
        return new Promise(resolve => {
            let insertUserInfo = " Insert into USER_INFO set ?";
            db.connection.beginTransaction((error) => {
                if (error) {
                    resolve({ response: error, status: 400 });
                }
                else {
                    db.connection.query(insertUserInfo, [userInfo], (insertUserInfoError) => {
                        if (insertUserInfoError) {
                            return db.connection.rollback(() => {
                                if (insertUserInfoError)
                                    resolve({ response: insertUserInfoError.code, status: 400 });
                            })
                        }
                        else {

                            let selectUserInfo = "SELECT info_id from USER_INFO where email = ?";
                            db.connection.query(selectUserInfo, [userInfo.email], function (selectUserInfoError, result) {
                                if (err) {
                                    return db.connection.rollback(() => {
                                        resolve({ response: selectUserInfoError.code, status: 400 });
                                    });
                                }
                                else {
                                    let insertStaff = " Insert into STAFF set ?";
                                    let staffData = {
                                        name: staff.name,
                                        cell_no: staff.cellNo,
                                        cnic_no: staff.body.cnicNo,
                                        gender: staff.gender,
                                        USER_INFO_info_id: result[0].info_id
                                    };
                                    db.connection.query(insertStaff, [staffData], (insertStaffError) => {
                                        if (insertStaffError) {
                                            db.connection.rollback(() => {
                                                resolve({ response: insertStaffError.code, status: 400 });
                                            });
                                        }
                                        else if (!(selectUserInfoError && insertStaffError)) {
                                            db.connection.commit((rollback_err) => {
                                                if (rollback_err) {
                                                    return db.connection.rollback(() => {
                                                        resolve({ response: rollback_err.code, status: 400 });
                                                    });
                                                }
                                                else {
                                                    resolve({ response: "Success", status: 200 });
                                                }
                                            });
                                        }
                                        else {
                                            resolve({ response: "Error creating staff", status: 400 });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    addAdmin(admin, userInfo) {
        return new Promise(resolve => {
            let insertUserInfo = " Insert into USER_INFO set ?";
            db.connection.beginTransaction((error) => {
                if (error) {
                    resolve({ response: error, status: 400 });
                }
                else {
                    db.connection.query(insertUserInfo, [userInfo], (insertUserInfoError) => {
                        if (insertUserInfoError) {
                            return db.connection.rollback(() => {
                                resolve({ response: insertUserInfoError.code, status: 400 });
                            })
                        }
                        else {

                            let selectUserInfo = "SELECT info_id from USER_INFO where email = ?";

                            db.connection.query(selectUserInfo, [userInfo.email], (selectUserInfoError, result) => {
                                if (selectUserInfoError) {
                                    return db.connection.rollback(() => {
                                        resolve({ response: selectUserInfoError.code, status: 400 });
                                    });
                                }
                                else {
                                    let insertAdmin = " Insert into ADMIN set ?";
                                    let adminData = {
                                        name: admin.name,
                                        cell_no: admin.cellNo,
                                        cnic_no: admin.cnicNo,
                                        gender: admin.gender,
                                        USER_INFO_info_id: id = result[0].info_id
                                    };
                                    db.connection.query(insertAdmin, [adminData], (insertAdminError) => {
                                        if (insertAdminError) {
                                            db.connection.rollback(function () {
                                                resolve({ response: insertAdminError.code, status: 400 });
                                            });
                                        }
                                        else if (!(selectUserInfoError && insertAdminError)) {
                                            db.connection.commit((rollback_err) => {
                                                if (rollback_err) {
                                                    return db.connection.rollback(() => {
                                                        resolve({ response: rollback_err.code, status: 400 });
                                                    });
                                                }
                                                else {
                                                    resolve({ response: "Success", status: 200 });
                                                }
                                            })
                                        }
                                        else {
                                            resolve({ response: "Error creating admin", status: 200 });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }
}