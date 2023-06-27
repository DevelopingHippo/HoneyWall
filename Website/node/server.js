// Constants
const express = require('express');
const mysql = require('mysql');

const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
const path = require("path");
const router = express.Router();

// Index Page
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"api/junk.html"));
});
// Dashboard
router.get('get-map-data', function(req, res){
    let result = queryDatabase("SELECT location, SUM(packets) AS total_packets FROM connections GROUP BY location")
    res.send( {
            "UZ": 37.72,
            "VU": 0.72,
            "VE": 285.21,
            "VN": 101.99,
            "YE": 30.02,
            "ZM": 15.69,
            "ZW": 5.57
    }
    )
});

app.use(express.static('/var/www/node/api'))
app.use('/', router)
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});




function queryDatabase(query) {
    let json_result = "";
    const con = mysql.createConnection({
        host: "db_honey",
        user: "web",
        password: "P@ssw0rd",
        database: "www"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            json_result = JSON.stringify(result);
        });
    });
    return json_result;
}