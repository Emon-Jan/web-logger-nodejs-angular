const express = require('express');
const router = express.Router();

const geoip2 = require('geoip2');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.11.20",
  user: "root",
  password: "minhaz1234",
  database: "weblog"
});


/* GET home page. */
router.get('/', function(req, res, next) {
  con.connect(function(err) {
    let data=[];
    if (err) throw err;
    con.query("SELECT * FROM log LIMIT 20", function (err, result) {
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
