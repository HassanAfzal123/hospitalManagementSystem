const db = require('../database');
module.exports = class Doctor {
    constructor(name, cellNo, cnicNo, gender, disease) {
        this.name = name;
        this.cellNo = cellNo;
        this.cnicNo = cnicNo;
        this.gender = gender;
        if(disease)
            this.disease = [...disease];
    }
    addDoctor(doctor) {
        return new Promise(resolve => {
            let insertDoctor = "Insert into DOCTOR set ?";
            db.connection.beginTransaction((error) => {
                if (error) {
                    resolve({ response: error.code, status: 500 })
                }
                else {
                    let Doctor = { name: doctor.name, cell_no: doctor.cellNo, cnic_no: doctor.cnicNo, gender: doctor.gender };
                    db.connection.query(insertDoctor, [Doctor], (insertDoctorError) => {
                        if (insertDoctorError) {
                            return db.connection.rollback(() => {
                                resolve({ response: insertDoctorError.code, status: 400 });
                            })
                        }
                        else {
                            let selectDoctor = "SELECT doctor_id from DOCTOR where cnic_no = ?";
                            db.connection.query(selectDoctor, [doctor.cnicNo], (selectDoctorError, result) => {
                                if (selectDoctorError) {
                                    return db.connection.rollback(() => {
                                        resolve({ response: selectDoctorError.code, status: 400 });
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
                                        if (i < doctor.disease.length) {
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
    getDoctor() {
        return new Promise(resolve => {
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