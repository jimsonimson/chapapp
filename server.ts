'use strict';
require('dotenv').config({ silent: true });
import express = require('express');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import passport = require('passport');

const app = express();


//Models
import mongoose = require('mongoose');
require('./models/user');
require('./models/hairstyle');
require('./config/passport');

//mlab (uncomment to use live database)
// mongoose.connect(process.env.MONGO_URL);

//Local mongoose connection
mongoose.connect('mongodb://localhost/chapApp');


// view engine setup
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

/////////////////////////////////////////////////////////////////
//Routes
/////////////////////////////////////////////////////////////////
let userRoutes = require('./routes/userRoutes');
let hairstyleRoutes = require('./routes/hairstyleRoutes');
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/hairstyles', hairstyleRoutes);


app.use(express.static('./ngApp'));
app.use('/scripts', express.static('bower_components'));

app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers
app.use(function(err: any, req, res, next) {
  res.status(err.status || 500);
  if (err.name === 'CastError') err.message = 'Invalid ID';
  // Don't leak stack trace if not in development
  let error = (app.get('env') === 'development') ? err : {};
  res.send({
    message: err.message,
    error: error
  });
});

export = app;
