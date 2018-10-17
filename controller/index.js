const express = require('express');
const router = express.Router();

const geoip2 = require('geoip2');
const sql = require('../config/db');

/* GET all data from db. */
router.get('/', function(req, res, next) {
    let data=[];
    let qry = "SELECT * FROM log LIMIT 20";

    sql.query(qry, function (err, result) {
      if (err) throw err;
      for (let key in result) {
        data.push(geoip2.lookupSync(result[key].ip));
      }

      console.log(data);
      res.send(data);
    });
  });

/*summary # returns timestamp start, end, number of rows, number of ip, number of uniq mac*/
router.get('/summary', function(req, res, next) {
    let qryForSummary = "SELECT MIN(timestamp) AS startTime, MAX(timestamp) AS endTime, COUNT(*) AS rowNum, COUNT(DISTINCT mac) AS uniqueMac From log";
    sql.query(qryForSummary, function (err, data) {
      if (err) throw err;
      console.log(data[0]);
      res.send(data[0]);
    });
  });

/* /mac?from='2018-10-01 16:00:00'&to='2018-10-07 16:00:00' # returns uniq list of mac addresses with datetime limit */
router.get('/mac', function(req, res, next) {

  console.log(req.query);
  
  let qryForSummary = "SELECT distinct mac FROM log WHERE timestamp BETWEEN UNIX_TIMESTAMP(" + 
  req.query.from +") and UNIX_TIMESTAMP(" + req.query.to + ")";

  sql.query(qryForSummary, function (err, data) {
    if (err) throw err;
    // console.log(data[0].mac);
    res.send(data);
  });

});

/* /ip?from=A&to=B&mac=M # retuns {mac: ip} with datetime limit */
router.get('/ip', function(req, res, next) {

  console.log(req.query);
  let qryForSummary = "SELECT ip From log WHERE mac=" + req.query.mac + " AND timestamp BETWEEN UNIX_TIMESTAMP(" + 
  req.query.from +") AND UNIX_TIMESTAMP(" + req.query.to + ") LIMIT 50";

  sql.query(qryForSummary, function (err, data) {
    if (err) throw err;
    // console.log(data);
    res.send(data);
  });

});

module.exports = router;
