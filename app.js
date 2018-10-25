const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const geoip2 = require('geoip2');
const sql = require('./config/db');
const indexController = require('./controller/index');


const app = express();
sql.connect();

geoip2.init('../GeoLite2-ASN_20181009/GeoLite2-ASN.mmdb');

/*
// Error case of lookup not returning null, throws error: 
// Error parsing address aplombtech-smartrouter.ralinktech.com: Name or service not known
geoip2.lookup('aplombtech-smartrouter.ralinktech.com', res => console.log(res)); 
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexController);


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

module.exports = app;
