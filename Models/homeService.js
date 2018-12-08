const db = require('../database');
module.exports = class HomeService{
    constructor(){

    }
    getHomeService(){
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
}