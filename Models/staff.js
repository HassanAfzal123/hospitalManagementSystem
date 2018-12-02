const WorkForce =  require('./workforce.js');
module.exports = class Staff extends WorkForce{
  constructor(name, cellNo, cnicNo, gender){
    super(name, cellNo, cnicNo, gender);
  }
}