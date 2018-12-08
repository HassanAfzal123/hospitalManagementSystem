module.exports.say = function(text,callback) {
    //text.replace(/[\W_]+/g," ").replace(":"," is ");
    text = text.replace(/:\s*/g," is ").replace(/","\s*/g," for ").replace(/},{\s*/g," and ");
    console.log(text);
    var proc = require("child_process");
    var commands = [ "Add-Type -AssemblyName System.speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Speak([Console]::In.ReadToEnd())" ];
    var options = { shell: true };
    var childD = proc.spawn("powershell", commands, options);
    childD.stdin.setEncoding("ascii");
    childD.stderr.setEncoding("ascii");
    childD.stdin.end(text);
    childD.stderr.once("data", function(data) {
        // we can"t stop execution from this function
        console.log(new Error("Sorry"+data));
        return callback("Sorry");
    });
    childD.addListener("exit", function (code, signal) {
        if (code === null || signal !== null) {
            return console.log(new Error("Could not talk, had an error [code: " + code + "] [signal: " + signal + "]"));
        }
        childD = null;
    });
};