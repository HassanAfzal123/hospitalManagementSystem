const Disease = require('./disease');
const Ward = require('./ward');
const Medicine = require('./medicine');
module.exports = class WorkForce {
    constructor(name, cellNo, cnicNo, gender) {
        this.name = name || "";
        this.cellNo = cellNo || "";
        this.cnicNo = cnicNo || "";
        this.gender = gender || "";
    }
    async addWard(ward) {
        let wardObj = new Ward();
        return await wardObj.addWard(ward);
    }

    async addDisease(disease) {
        let disease = new Disease();
        return await disease.getDisease(disease);
    }

    async addMedicine(medicine) {
        let medicineObj = new Medicine();
        return medicineObj.addMedicine(medicine);
    }
}