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


// f={};
// console.log(f);
// a='abc';
// f[a]=12;
// f[a]+=12;
// console.log(f);
// a='bax';
// f[a]=1;
// f[a]+=1;
// console.log(f);
// b='mac1';
// f[a][b] = 12;
// b='mac2'
// f[a][b] = 42;
// console.log(f[a][b]);

// function sum( obj ) {
//   var sum = 0;
//   for( var el in obj ) {
//     if( obj.hasOwnProperty( el ) ) {
//       sum += parseInt( obj[el] );
//     }
//   }
//   return sum;
// }
// console.log(sum(f));
// console.log(f[a]);
// console.log(f);


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
