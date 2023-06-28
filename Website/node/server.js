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
    //origin: 'http://localhost:63342', // this domain is allowed to make API calls
    origin: 'http://localhost:8443',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), function(req, res){
    res.sendFile(path.join(__dirname+"/api/junk.html"));
});

app.get('/geo-pie-data', cors(corsOptions), function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.json([
        {name: "Alex", share: 20.70},
        {name: "Shelly", share: 30.92},
        {name: "Clark", share: 15.42},
        {name: "Matt", share: 13.65},
        {name: "Jolene", share: 19.31}
    ]
);
});



app.get('/get-map-data', cors(corsOptions), function(req, res){

    res.setHeader('Content-Type', 'application/json');
    let query = "SELECT location, sum(packets) AS total_packets FROM connections GROUP BY location;";

    const con = mysql.createConnection({
        host: "db_honey",
        user: "web",
        password: "P@ssw0rd",
        database: "honeywall"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result) {
            let formatted_result = '{';
            if (err) throw err;
            else {
                for (var i = 0; i < result.length - 1; i++) {
                    formatted_result += '"' + result[i]['location'] + '":' + result[i]['total_packets'] + ',';
                }
                formatted_result += '"' + result[result.length - 1]['location'] + '":' + result[result.length - 1]['total_packets'] + "}";
                let json_format = JSON.parse(formatted_result);
                res.json(json_format);
            }
        });
    });
    con.close();
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










function query_honeywall_database(query, callback) {
    let json_result;
    const con = mysql.createConnection({
        host: "db_honey",
        user: "web",
        password: "P@ssw0rd",
        database: "honeywall"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result) {
            if (err) throw err;
            callback(result);
        });
    });
}