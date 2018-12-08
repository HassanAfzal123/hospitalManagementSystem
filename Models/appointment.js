const db = require('../database');
module.exports = class Appointment{
    constructor(){
    }
    getAppointment(){
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
}