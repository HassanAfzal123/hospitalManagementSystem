const passport = require('passport') ;
const LocalStrategy = require('passport-local').Strategy ;
//const User = require('../Models/User') ;
const db = require('../database');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log("Serializing user");
        done(null, user[0].email);
    });
    
    passport.deserializeUser(function(email, done) {
        console.log("sadas");
        let queryString = 'SELECT * FROM UserInfo where email ?';
        db.connection.query(queryString,[email], function(err, result, fields) {
            done(err, result);
        });
    });
	passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'},
        (email, password, done)=> {
        let queryString = 'SELECT * FROM UserInfo where email = ?';
        db.connection.query(queryString,[email], function(err, result, fields) {
            try{
                if(err)
                return done(err);
                else if(!result)
                    return done(null, false, { message: 'Incorrect username.' });
                    else if(result[0].password!=password)
                        return done(null, false, { message: 'Incorrect password.' });
                        else
                            return done(null, result);
            }
            catch(err){
                return done(err);
            }
        });
        }
      ));
      
}