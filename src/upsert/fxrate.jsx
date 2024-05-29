var mysql = require('mysql');

var conx = mysql.createConnection({
  host: "13.211.65.106:3306",
  user: "pokeradmin",
  password: "poker6789",
  database: "pokeranalytics"
});

conx.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");

  var sqlA = "INSERT INTO fxUSD (provider, datestamp, rates, status) VALUES ('Company Inc', 'Highway 37')";
  var sqlB = "INSERT INTO fxUSD (provider, datestamp, rates, status) VALUES ('Company Inc', 'Highway 37')";
  var sqlC = "INSERT INTO fxUSD (provider, datestamp, rates, status) VALUES ('Company Inc', 'Highway 37')";

  conx.query(sqlA, function (err, result) {
    if (err) throw err;
    console.log("FX Rate A inserted, ID: " + result.insertId);
  });
  
  conx.query(sqlB, function (err, result) {
    if (err) throw err;
    console.log("FX Rate B inserted, ID: " + result.insertId);
  });

  conx.query(sqlC, function (err, result) {
    if (err) throw err;
    console.log("FX Rate C inserted, ID: " + result.insertId);
  });

  conx.end();
});
