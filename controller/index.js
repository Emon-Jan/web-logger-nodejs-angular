const express = require('express');
const router = express.Router();

const geoip2 = require('geoip2');
const mysql = require('mysql');

var sql = mysql.createConnection({
  host: "192.168.11.20",
  user: "root",
  password: "minhaz1234",
  database: "weblog"
});


/* GET all data from db. */
router.get('/', function(req, res, next) {
  sql.connect(function(err) { 
    let data=[];
    let qry = "SELECT * FROM log LIMIT 20";

    if (err) throw err;
    sql.query(qry, function (err, result) {
      if (err) throw err;
      for (let key in result) {
        data.push(geoip2.lookupSync(result[key].ip));
      }

      console.log(data);
      res.send(data);
    });
  });
});

module.exports = router;
