const db = require('../database');
const Disease = require('./disease');
const WorkForce = require('./workforce.js');
const Staff = require('./staff');
const BloodRequest = require('./bloodRequest');
const Medicine = require('./medicine');
const Ward = require('./ward');
const Doctor = require('./doctor');
const HomeService = require('./homeService');
const Appointment = require('./appointment');
module.exports = class Admin extends WorkForce {
    constructor(name, cellNo, cnicNo, gender) {
        super(name, cellNo, cnicNo, gender)
    }

    async addStaff(staff, userInfo) {
        let staf = new Staff();
        return await staf.addStaff(staff,userInfo);
    }

    addAdmin(admin, userInfo) {
        return new Promise(resolve => {
            let insertUserInfo = " Insert into USER_INFO set ?";
            db.connection.beginTransaction((error) => {
                if (error) {
                    console.log(error)
                    console.log('1')
                    resolve({ response: error, status: 400 });
                }
                else {
                    db.connection.query(insertUserInfo, [userInfo], (insertUserInfoError) => {
                        console.log(insertUserInfo)
                        if (insertUserInfoError) {
                            return db.connection.rollback(() => {
                                resolve({ response: insertUserInfoError.code, status: 400 });
                            })
                        }
                        else {
                            let selectUserInfo = "SELECT info_id from USER_INFO where email = ?";

                            db.connection.query(selectUserInfo, [userInfo.email], (selectUserInfoError, result) => {
                                console.log(selectUserInfoError);
                                console.log(result)
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
                                        USER_INFO_info_id: result[0].info_id
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
    getAdmin() {
        return new Promise(resolve => {
            let selectAdmin = "Select A.admin_id,A.name,A.cell_no,A.cnic_no,A.gender,UI.email from ADMIN A, USER_INFO UI where A.USER_INFO_info_id = UI.info_id;";
            db.connection.query(selectAdmin, (selectAdminError, result) => {
                if (selectAdminError) {
                    resolve({ response: selectAdminError.code, status: 500 });
                }
                else {
                    resolve({ response: result, status: 200 });
                }
            })
        })
    }
    async getStaff() {
        let staff = new Staff();
        return await staff.getStaff();
    }
    async getDisease() {
        let disease = new Disease();
        return await disease.getDisease();
    }
    async getMedicine() {
        let medicine = new Medicine();
        return await medicine.getMedicine();
    }
    async getWard() {
        let ward = new Ward();
        return await ward.getWard();
    }
    async getBloodRequest() {
        let bloodRequest = new BloodRequest();
        return await bloodRequest.getBloodRequest();
    }
    async getAppointment() {
        let appointment = new Appointment();
        return await appointment.getAppointment();
    }
    async getHomeService() {
        let homeService = new HomeService();
        return await homeService.getHomeService();
    }
    async getDiseaseList(){
        let disease = new Disease();
        return await disease.getDiseaseList();
    }
    async addDoctor(doctor){
        let doctorObj = new Doctor();
        return await doctorObj.addDoctor(doctor);
    }
    async getDoctor(){
        let doctor = new Doctor();
        return await doctor.getDoctor();
    }
}