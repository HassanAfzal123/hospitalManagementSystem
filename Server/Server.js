const app = require('../app');
const http=require('http');
const chat = require('../Models/Chatbot');
const os = require('os');
const ChatBotVoice = require('../Models/TextSpeech');
const port = process.env.PORT || 3001;
var server = http.createServer(app.app);
var io = require("socket.io")(server);

io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message',"USER: "+msg);
         chat.chatbot(msg,function (getAnswer,getText) {
             if(typeof getAnswer === 'string') {
                 let FinalAnswer = JSON.stringify(getAnswer);
                 io.emit('chat message',"BOT: "+ FinalAnswer);
                 console.log(os.platform());
                 if(os.platform()==="win32") {
                     ChatBotVoice.say(FinalAnswer);
                 }
             }
             else{
                 io.emit('chat message',"BOT: "+getText);
                 //ChatBotVoice.say("We have these doctors available for your disease");
                  for(let i=0;i<getAnswer.length;i++){
                     io.emit('chat message', "BOT: Doctor Name: " + getAnswer[i].DoctorName + " for " + getAnswer[i].Disease);
                 }
                 if(os.platform()==="win32") {
                     ChatBotVoice.say(getText + JSON.stringify(getAnswer));
                 }
             }
         });



    });
});
server.listen(port , () => {
  console.log(`server is up and running on port: ${port}`);
});
