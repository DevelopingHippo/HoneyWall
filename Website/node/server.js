// Constants
const express = require('express');
const mysql = require('mysql');

const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
const path = require("path");
var cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:63342', // this domain is allowed to make API calls
    //origin: 'http://localhost:8443',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Index Page
app.get('/', cors(corsOptions), function(req, res){
    res.sendFile(path.join(__dirname+"/api/junk.html"));
});
// Dashboard
app.get('/get-map-data', cors(corsOptions), function(req, res){
    //let result = queryDatabase("SELECT location, SUM(packets) AS total_packets FROM connections GROUP BY location");

    res.setHeader('Content-Type', 'application/json');
    res.json(
        {
            "US": 14624.18,
            "UY": 40.71,
            "UZ": 37.72,
            "VU": 0.72,
            "TN": 43.86,
            "TR": 729.05,
            "TM": 1000,
            "UA": 136.56,
            "UG": 17.12
            }
    );
});

app.get('/get-chart-data', cors(corsOptions), function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.json([
            {
                "month": "January",
                "packet_number": 1000
            },
            {
                "month": "February",
                "packet_number": 1200
            },
            {
                "month": "March",
                "packet_number": 300
            },
            {
                "month": "April",
                "packet_number": 400
            },
            {
                "month": "May",
                "packet_number": 450
            },
            {
                "month": "June",
                "packet_number": 355
            },
            {
                "month": "July",
                "packet_number": 203
            },
            {
                "month": "August",
                "packet_number": 122
            },
            {
                "month": "September",
                "packet_number": 700
            },
            {
                "month": "October",
                "packet_number": 960
            },
            {
                "month": "November",
                "packet_number": 104
            },
            {
                "month": "December",
                "packet_number": 1010
            }
    ]
    );
});


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