exports.chatbot = function(userMsg,callback){
const db = require('../database');
const TextRazor = require('textrazor');
const textRazor = new TextRazor('8e3f98862a3fd4aa7b9b3b391e1e14dc56771b60cd36e1c92465a850');
const options = { extractors: 'words,entailments,entities'};//,categoies,relations,properties' };

    let findAnswerid = "SELECT ANSWER_answer_id FROM ASKED_QUESTIONS where question = ?";
    db.connection.query(findAnswerid,[userMsg],function (answerIdErr,answerId) {
       if(answerIdErr){
           throw answeridErr;
       }
       else if(answerId.length > 0){
           let getAnswer = "SELECT response FROM ANSWER where answer_id = ?";
           db.connection.query(getAnswer,[answerId[0].ANSWER_answer_id],function (AnswerNotAvailable,userAnswer) {
               if(AnswerNotAvailable){
                   callback("ChatBot is currently down right now, please try again later !");
               }
               else{
                   callback(userAnswer[0].response);
               }
           });
       }
       else{
           textRazor.exec(userMsg, options)
               .then(result =>{
                   let disease= new Array();

                   let check=0;
                   //Checking if there is a doctor key word in the asked question.
                   if(result.response.entailments) {
                       result.response.entailments.forEach(element => {
                           if (element.entailedWords[0] == 'doctor')
                               check = 1;
                       });
                   }
                   //If there is a question about doctor..
                   if(check==0){
                       callback("Sorry, but I really do not understand what you are saying.");
                   }
                   else{
                       if(result.response.entities) {
                           result.response.entities.forEach(async element => {
                               if (element.type == 'Disease') {
                                   await disease.push(element.entityId);
                               }
                           });
                           check=0;
                           let get_Doctor = "SELECT DOCTOR.name as DoctorName,DISEASE.name as Disease FROM DOCTOR,DOCTOR_DISEASE,DISEASE where DOCTOR.doctor_id = DOCTOR_DISEASE.DOCTOR_doctor_id AND DISEASE.disease_id = DOCTOR_DISEASE.DISEASE_disease_id AND DISEASE.name in (?)";
                           db.connection.query(get_Doctor, [disease], function (err, doctor) {
                               if (err) throw err;
                               else if(doctor.length > 0){
                                   callback(doctor,"List of Doctors available for your diseases are mentioned below");
                               }
                               else{
                                   callback("Sorry, but we do not have any doctor available for any of these diseases.");
                               }

                           });
                       }
                       else{
                           callback("For what disease you're looking for a Doctor?");

                       }

                   }

               })
               .catch(err => console.error(err));
       }
    });





};