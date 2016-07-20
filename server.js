var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session')
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var passportConfig = require('./config/passport.js');
var cors = require('cors');
var dotenv = require('dotenv').load({silent: true})
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
// supposed to fall-back url for SPA
// doesnt work
var history = require('connect-history-api-fallback');

var routes = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');

var app = express();

// initializes mongodb
mongoose.connect('mongodb://localhost/binjr', function(err) {
  if (err) throw err;
  console.log('Connected to mongodb (binjr)')
})


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// establishes session settings to keep users logged in
app.use(session ({
  cookie: {_expires:60000000},
  secret: "chill",
  resave: true,
  saveUninitialized: false
}))
// middleware for logging in and verifying users
app.use(passport.initialize())
app.use(passport.session())

//CORS middleware for requesting from 3rd party API
app.use(cors())
app.use(function (req, res, next) {
   res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
   res.header('Pragma', 'no-cache');
   res.header('Expires', 0 );
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   if (req.method === 'Options') {
     res.send(200);
   } else {
     return next();
   }
 })



app.use('/users', users);
app.use('/tweets', tweets);
// middleware for falling back on index url
// supposed to work but does not
app.use(history())
app.use('/', function(req, res) {
  res.sendFile('index.html')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var PORT = process.env.PORT || 3000
app.listen(PORT, function(err) {
  if (err) throw err;
  console.log("Server running on Port:", PORT)
})


module.exports = app;
