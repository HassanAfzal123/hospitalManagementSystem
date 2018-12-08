const db = require('../database');
module.exports = class Ward{
    constructor(name,bedCount,wardClass){
        this.name=name;
        this.bedCount=bedCount;
        this.wardClass=wardClass;
    }
    addWard(ward){
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
}