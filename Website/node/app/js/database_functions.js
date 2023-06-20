const mysql = require('mysql');

alert("The database page loaded")

var con = mysql.createConnection({
    host: "db_honey",
    user: "web",
    password: "P@ssw0rd",
    database: "www"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});