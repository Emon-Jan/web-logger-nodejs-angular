const mysql = require('mysql');

var sql = mysql.createConnection({
  host: "192.168.11.20",
  user: "root",
  password: "minhaz1234",
  database: "weblog"
});

module.exports = sql;