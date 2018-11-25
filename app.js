const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const hbs = require('express-handlebars');
const passport = require('passport');
const ejs = require('ejs');
const session = require('express-session');
const cors = require('cors');

const indexRouter = require('./routes/index');
const admin = require('./routes/admin');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const donateBlood = require('./routes/donateBlood');
const locationRouter = require('./routes/location');
const reportUploadRouter = require('./routes/labortoryReports');
const requestbloodRouter = require('./routes/bloodReciever');
const appointmentformRouter = require('./routes/appointmentform');
const homeserviceRouter = require('./routes/homeService');
const app = express();

// view engine setup
app.engine('hbs',hbs({extname: 'hbs', defaultLayout: 'main', layout: __dirname + '/views'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'hbs');

app.use(cors())
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret: "asdsadasdsadasdas", resave: false, saveUninitialized: false, cookie: { maxAge: 60000 * 10} }));
require('./Passport/passport')(passport); 

app.use('/home', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/labortaryreports', reportUploadRouter);
app.use('/donateBlood',donateBlood);
app.use('/location',locationRouter);
app.use('/requestBlood',requestbloodRouter);
app.use('/appointment',appointmentformRouter);
app.use('/homeService',homeserviceRouter);
app.use('/admin',admin);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports.app = app;

