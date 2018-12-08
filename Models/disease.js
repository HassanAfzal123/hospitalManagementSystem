const db = require('../database');
module.exports = class Disease{
    constructor(disease_name,Ddescriptionbox,symptoms){
        this.name=disease_name;
        this.description=Ddescriptionbox;
        this.symptoms=symptoms;
    }
    getDisease(){
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
    addDisease(disease){
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
}