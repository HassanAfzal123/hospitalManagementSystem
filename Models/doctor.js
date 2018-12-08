module.exports = class Doctor{
    constructor(name,cellNo,cnicNo,gender,disease)
    {
        this.name = name;
        this.cellNo = cellNo;
        this.cnicNo = cnicNo;
        this.gender = gender;
        this.disease = [...disease];
    }
}