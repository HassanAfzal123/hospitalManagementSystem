const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const User = require('../Models/User') ;
const db = require('../database');
const bcrypt = require('bcryptjs');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        console.log("Serializing user");
        done(null, user[0].email);
    });

    passport.deserializeUser(function (email, done) {
        console.log("Deserializing user");
        done(err, email);
    });
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        (email, password, done) => {
            let queryString = 'SELECT password FROM USER_INFO where email = ?';
            db.connection.query(queryString, [email], function (err, result, fields) {
                try {
                    if (err)
                        return done(err);
                    else if (result.length == 0)
                        return done(null, false, { message: 'Email not present please sign up to continue.' });
                    else if (!(bcrypt.compareSync(password, result[0].password)))
                        return done(null, false, { message: 'Incorrect password.' });
                    else
                        return done(null, result);
                }
                catch (err) {
                    return done(err);
                }
            });
        }
    ));
};