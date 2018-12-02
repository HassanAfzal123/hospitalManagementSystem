const express = require('express');
const path = require('path');
const db = require('../database');
const router = express.Router();
const TextRazor = require('textrazor');
const textRazor = new TextRazor('8e3f98862a3fd4aa7b9b3b391e1e14dc56771b60cd36e1c92465a850');
const content = 'Get me a physician for cancer,Hepatitis and malaria';
const options = { extractors: 'words,entailments,entities'};//,categoies,relations,properties' };
// router.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'../','views/chatbot.html'));
// });
router.get('/',(req,res)=>{
    textRazor.exec(content, options)
    .then(result =>{
        let disease= new Array();
        // result.response.sentences[0].words.forEach(element => {
        //     if(element.partOfSpeech=="NN"){
        //         nouns.push(element.token);
        //     }
        // });
        let check=0;
        //Checking if there is a doctor key word in the asked question.
        result.response.entailments.forEach(element=>{
            if(element.entailedWords[0]=='doctor')
                check=1;
        });
        //If there is a question about doctor..
        if(check==0){
            console.log("Invalid query..");
        }
        else{
            result.response.entities.forEach(async element=>{
                if(element.type=='Disease'){
                    console.log(element.entityId);
                    await  disease.push(element.entityId);
                }
            });
            check=0;
            var j;
            console.log(disease);
            let get_Doctor = "SELECT DOCTOR.name,DISEASE.name as Disease FROM DOCTOR,DOCTOR_DISEASE,DISEASE where DOCTOR.doctor_id = DOCTOR_DISEASE.DOCTOR_doctor_id AND DISEASE.disease_id = DOCTOR_DISEASE.DISEASE_disease_id AND DISEASE.name = ?"
            console.log("Here is the list of the doctors for your disease: ");
            for(j=0;j < disease.length;j++)
            {
                db.connection.query(get_Doctor, [disease[j]], function (err, doctor) {
                    if (err) throw err;
                    if(doctor.length < 1) {
                        console.log("Sorry,we have no doctor available for"); //SHOW DISEASE NAME HERE
                    }
                    else {
                         console.log(doctor);
                    }

                });
            }
        }
        res.send(result);
        
    })
  .catch(err => console.error(err));
})

// io.on('connection', function (socket) {
//     socket.on('chat message', function (msg) {
//         console.log(msg);
//         io.emit('chat message', msg);
//     });
// });
module.exports = router;