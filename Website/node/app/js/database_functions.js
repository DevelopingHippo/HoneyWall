const mysql = require('mysql');

var con = mysql.createConnection({
    host: "db_honey",
    user: "web",
    password: "P@ssw0rd",
    database: "honeywall"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM connections", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});