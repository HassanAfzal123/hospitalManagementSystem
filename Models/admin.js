const db = require('../database');
const WorkForce = require('./workforce.js');
module.exports = class Admin extends WorkForce {
    constructor(name, cellNo, cnicNo, gender) {
        super(name, cellNo, cnicNo, gender)
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
                                if (insertUserInfoError) {
                                    resolve({ response: insertUserInfoError.code, status: 400 });
                                }

                            })
                        }
                        else {
                            let selectUserInfo = "SELECT info_id from USER_INFO where email = ?";
                            db.connection.query(selectUserInfo, [userInfo.email], function (selectUserInfoError, result) {
                                if (selectUserInfoError) {
                                    return db.connection.rollback(() => {
                                        resolve({ response: selectUserInfoError.code, status: 400 });
                                    });
                                }
                                else {
                                    let insertStaff = " Insert into STAFF set ?";
                                    let staffData = {
                                        name: staff.name,
                                        cell_no: staff.cellNo,
                                        cnic_no: staff.cnicNo,
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
    getStaff() {
        return new Promise(resolve => {
            let selectStaff = "Select S.staff_id, S.name,S.cell_no,S.cnic_no,S.gender,UI.email from STAFF S, USER_INFO UI where S.USER_INFO_info_id = UI.info_id;";
            db.connection.query(selectStaff, (selectStaffError, result) => {
                if (selectStaffError) {
                    resolve({ response: selectStaffError.code, status: 500 });
                }
                else {
                    resolve({ response: result, status: 200 });
                }
            })
        })
    }
    getDisease() {
        return new Promise(resolve => {
            let selectDisease = "Select disease_id , name , details , symptoms from DISEASE";
            db.connection.query(selectDisease, (selectDiseaseError, result) => {
                if (selectDiseaseError) {
                    resolve({ response: selectDiseaseError.code, status: 500 });
                }
                else {
                    resolve({ response: result, status: 200 });
                }
            })
        })
    }
    getMedicine() {
        return new Promise(resolve => {
            let selectMedicine = "Select medicine_id , name , company from MEDICINE";
            db.connection.query(selectMedicine, (selectMedicineError, result) => {
                if (selectMedicineError) {
                    resolve({ response: selectMedicineError.code, status: 500 });
                }
                else {
                    resolve({ response: result, status: 200 });
                }
            })
        })
    }
    getWard() {
        return new Promise(resolve => {
            let selectWard = "Select ward_id , name, bed_count, class from WARD";
            db.connection.query(selectWard, (selectWardError, result) => {
                if (selectWardError) {
                    resolve({ response: selectWardError.code, status: 500 });
                } else {
                    resolve({ response: result, status: 200 });
                }
            })
        })
    }
    getBloodRequest() {
        return new Promise(resolve => {
            let selectBloodRequest = "Select P.first_name,P.last_name,P.cell_no,BR.blood_group,BR.status,BD.name,BD.number from PATIENT P,BLOOD_REQUEST BR LEFT JOIN BLOOD_DONOR BD ON BR.BLOOD_DONOR_donor_id=BD.donor_id where  BR.PATIENT_patient_id=P.patient_id";
            db.connection.query(selectBloodRequest, (selectBloodRequestError, result) => {
                if (selectBloodRequestError) {
                    resolve({ response: selectBloodRequestError.code, status: 500 });
                }
                else {
                    resolve({ response: result, status: 200 })
                }
            })
        });
    }
    getAppointment() {
        return new Promise(resolve => {
            let selectAppointment = "Select A.name,P.first_name,P.last_name,P.cell_no,A.date,A.time,A.status from PATIENT P , APPOINTMENT A where A.PATIENT_patient_id=P.patient_id";
            db.connection.query(selectAppointment, (selectAppointmentError, result) => {
                if (selectAppointmentError) {
                    resolve({ response: selectAppointmentError.code, status: 500 });
                }
                else {
                    resolve({ response: result, status: 200 });
                }
            })
        })
    }
    getHomeService() {
        return new Promise(resolve => {
            let selectHomeService = "Select HS.home_service_id,P.first_name,P.last_name,HS.description,HS.Status,D.name,D.cell_no from PATIENT P, HOME_SERVICE HS LEFT JOIN DOCTOR D ON D.doctor_id=HS.DOCTOR_doctor_id where P.patient_id=HS.PATIENT_patient_id";
            db.connection.query(selectHomeService, (selectHomeServiceError, result) => {
                if (selectHomeServiceError) {
                    resolve({ response: selectHomeServiceError, status: 500 })
                }
                else {
                    resolve({ response: result, status: 200 });
                }
            })
        })
    }
    getDiseaseList(){
        return new Promise(resolve => {
            let selectDisease = "Select disease_id , name from DISEASE";
            db.connection.query(selectDisease, (selectDiseaseError, result) => {
                if (selectDiseaseError) {
                    resolve({ response: selectDiseaseError.code, status: 500 })
                }
                else {
                    resolve({ response: result, status: 200 })
                }
            })
        })
    }
    addDoctor(doctor){
        return new Promise(resolve => {
            let insertDoctor = "Insert into DOCTOR set ?";
            db.connection.beginTransaction((error) => {
                if (error) {
                    resolve({response:error.code,status:500})
                }
                else {
                    let Doctor = {name:doctor.name,cell_no:doctor.cellNo,cnic_no:doctor.cnicNo,gender:doctor.gender};
                    db.connection.query(insertDoctor, [Doctor], (insertDoctorError) => {
                        if (insertDoctorError) {
                            return db.connection.rollback(() => {
                                resolve({ response: insertDoctorError, status: 400 });
                            })
                        }
                        else {
                            let selectDoctor = "SELECT doctor_id from DOCTOR where cnic_no = ?";
                            db.connection.query(selectDoctor, [doctor.cnicNo], (selectDoctorError, result) => {
                                console.log(result)
                                if (selectDoctorError) {
                                    return db.connection.rollback(() => {
                                        resolve({ response: selectDoctorError, status: 400 });
                                    });
                                }
                                else {
                                    let i = 0;
                                    set(0);
                                    function set(i) {
                                        let insertDisease = " Insert into DOCTOR_DISEASE set ?";
                                        let doctor_disease = {
                                            DOCTOR_doctor_id: result[0].doctor_id,
                                            DISEASE_disease_id: doctor.disease[i]
                                        };
                                        db.connection.query(insertDisease, [doctor_disease], (insertDiseaseError) => {
                                            if (insertDiseaseError) {
                                                db.connection.rollback(function () {
                                                    resolve({ response: insertDiseaseError.code, status: 400 });
                                                });
                                            }
                                            else if (!(selectDoctor && insertDiseaseError)) {
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
                                                resolve({ response: "Error creating doctor", status: 200 });
                                            }
                                        })
                                        if (i < doctor.disease.length)
                                        {
                                            set(i + 1);
                                        }
                                        else {
                                            resolve({ response: "success", status: 200 })
                                        }
                                    }

                                }
                            })
                        }
                    })
                }
            })
        })
    }
    getDoctor(){
        return new Promise(resolve=>{
            let selectDoctor = "SELECT name ,cell_no,cnic_no ,gender FROM DOCTOR";
            db.connection.query(selectDoctor, (selectDoctorError, result) => {
                if (selectDoctorError) {
                    resolve({ response: selectDoctorError, status: 500 })
                }
                else {
                    resolve({ response: result, status: 200 })
                }
            })
        })
    }
}