const db = require('../database');
module.exports = class Medicine {
    constructor(name, company) {
        this.name = name;
        this.company = company;
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

}