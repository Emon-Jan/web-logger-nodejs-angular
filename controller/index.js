const express = require('express');
const router = express.Router();

const geoip2 = require('geoip2');
const sql = require('../config/db');

function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseInt( obj[el] );
    }
  }
  return sum;
}

/*summary # returns timestamp start, end, number of rows, number of ip, number of uniq mac*/
router.get('/summary', function(req, res, next) {
    let qryForSummary = "SELECT MIN(timestamp) AS startTime, MAX(timestamp) AS endTime, COUNT(*) AS rowNum, COUNT(DISTINCT mac) AS uniqueMac From log";
    sql.query(qryForSummary, function (err, data) {
      if (err) throw err;
      res.send(data[0]);
    });
  });

/* /mac?from=A&to=B # returns uniq list of mac addresses with datetime limit */
router.get('/mac', function(req, res, next) {
  let qryForMac = "SELECT distinct mac, COUNT(*) AS num FROM log WHERE timestamp BETWEEN " + req.query.from + " AND " + req.query.to + " GROUP BY mac ORDER BY COUNT(*) DESC";
  
  sql.query(qryForMac, function (err, data) {
    if (err) res.status(400).send("Bad request");

    res.send(data);
  });

});

/* /ip?from=A&to=B&mac=M # retuns {mac: ip} with datetime limit */
router.get('/ip', function (req, res, next) {
  let f = {};
  let a, count;  
  let qryForIp = "SELECT ip, timestamp AS time From log WHERE mac=" + req.query.mac + " AND timestamp BETWEEN " + req.query.from + " AND " + req.query.to + "";
  
  sql.query(qryForIp, function (err, data) {
    if (err) res.status(400).send("Bad request");
    try {
      for (const key in data) {
        a = geoip2.lookupSync(data[key].ip);
        if (a != null) {
          if (!f[a.autonomous_system_organization]) {
            f[a.autonomous_system_organization] = 1;
          } else {
            f[a.autonomous_system_organization] += 1;
          }
        } else{
            a = { autonomous_system_organization: 'local or n/a'};
            if (!f[a.autonomous_system_organization]) {
              f[a.autonomous_system_organization] = 1;
            } else {
              f[a.autonomous_system_organization] += 1;
            }
        }
      }
    } catch (error) {   
        a = { autonomous_system_organization: 'local or n/a'};
        if (!f[a.autonomous_system_organization]) {
          f[a.autonomous_system_organization] = 1;
        } else {
          f[a.autonomous_system_organization] += 1;
        }
    }
    count = sum(f);
      let per = []
      for (const key in f) {
        val = parseFloat((f[key] / count * 100).toFixed(2));
        per.push({ name: key, y: val, startTime: data[0].time, endTime: data[data.length-1].time})
      }
      res.send(per);
  });
});

module.exports = router;

// "SELECT ip, timestamp AS time From log WHERE mac="" AND timestamp BETWEEN '1538363117' AND '1538399117'"
// 1538363117
// 1538399117