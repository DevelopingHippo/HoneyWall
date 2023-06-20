import mysql from "mysql";


function queryDatabase() {
    const con = mysql.createConnection({
        host: "db_honey",
        user: "web",
        password: "P@ssw0rd",
        database: "www"
    });
    alert("The database page loaded")
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
}



