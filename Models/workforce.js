const db = require('../database');
module.exports = class WorkForce {
    constructor(name, cellNo, cnicNo, gender) {
        this.name = name || "";
        this.cellNo = cellNo || "";
        this.cnicNo = cnicNo || "";
        this.gender = gender || "";
    }
    addWard(ward) {
        return new Promise(resolve => {
            db.connection.beginTransaction((error) => {
                if (error) {
                    resolve({ response: error, status: 400 });
                }
                else {
                    let wardData = {
                        name: ward.name,
                        bed_count: ward.bedCount,
                        class: ward.wardClass
                    }
                    let insertWard = "Insert into WARD set ?";
                    db.connection.query(insertWard, [wardData], (insertWardError) => {
                        if (insertWardError) {
                            resolve({ response: insertWardError.code, status: 400 });
                        }
                        else {
                            let selectWardId = "Select ward_id from WARD where name = ?";
                            db.connection.query(selectWardId, [ward.name], (selectWardError, result) => {
                                if (selectWardError) {
                                    return db.connection.rollback(() => {
                                        resolve({ response: selectWardError.code, status: 400 });
                                    })
                                }
                                else {
                                    let bedData = { WARDS_ward_id: result[0].ward_id };
                                    let i = 0;
                                    set(0);
                                    function set(i) {
                                        let insertBed = "Insert into BED set ?";
                                        db.connection.query(insertBed, [bedData], (insertBedError, result) => {
                                            if (insertBedError) {
                                                return db.connection.rollback(() => {
                                                    resolve({ response: insertBedError.code, status: 400 });
                                                });
                                            }
                                        })
                                        if (i < ward.bedCount)
                                            set(i + 1);
                                        else {
                                            db.connection.commit((rollback_err) => {
                                                if (rollback_err) {
                                                    return db.connection.rollback(() => {
                                                        resolve({ response: rollback_err.code, status: 400 });

                                                    });
                                                }
                                                else {
                                                    resolve({ response: "success", status: 200 });
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
    }

    addDisease(disease) {
        return new Promise(resolve => {
            let insert_Disease = "INSERT INTO DISEASE SET ?";
            let disease_info = {
                name: disease.name,
                details: disease.description,
                symptoms: disease.symptoms
            };
            db.connection.query(insert_Disease, [disease_info], inserDiseaseError => {
                if (inserDiseaseError) {
                    if (inserDiseaseError.errno == 1062) {
                        resolve({ response: inserDiseaseError.code, status: 409 });
                    }
                    else {
                        console.log(inserDiseaseError);
                        resolve({ response: inserDiseaseError.code, status: 400 });
                    }
                }
                else {
                    resolve({ response: "Success", status: 200 });
                }
            })
        })
    }

    addMedicine(medicine) {
        return new Promise(resolve => {
            let insert_Medicine = "INSERT INTO MEDICINE SET ?";
            let Medicine_info = {
                name: medicine.name,
                company: medicine.company
            };
            db.connection.query(insert_Medicine, [Medicine_info], insertMedicineError => {
                if (insertMedicineError) {
                    if (insertMedicineError.errno == 1062) {
                        resolve({ response: insertMedicineError.code, status: 409 });
                    }
                    else {
                        resolve({ response: insertMedicineErro.code, status: 400 });
                    }
                }
                else {
                    resolve({ response: "Success !", status: 200 });
                }
            })
        })

    }
}