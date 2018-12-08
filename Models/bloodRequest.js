const db = require('../database');
module.exports= class BloodRequest{
    constructor(){
    }
    getBloodRequest(){
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
}