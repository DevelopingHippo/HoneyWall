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
    //let result = queryDatabase("SELECT location, SUM(packets) AS total_packets FROM connections GROUP BY location");

    res.setHeader('Content-Type', 'application/json');

    console.log(queryDatabase("SELECT location AS '', sum(packets) AS '' FROM connections GROUP BY location;"));
    res.json(queryDatabase("SELECT location AS '', sum(packets) AS '' FROM connections GROUP BY location;"));

    // res.json(
    //     {
    //         "AF": 16.63,
    //         "AL": 11.58,
    //         "DZ": 158.97,
    //         "AO": 85.81,
    //         "AG": 1.1,
    //         "AR": 351.02,
    //         "AM": 8.83,
    //         "AU": 1219.72,
    //         "AT": 366.26,
    //         "AZ": 52.17,
    //         "BS": 7.54,
    //         "BH": 21.73,
    //         "BD": 105.4,
    //         "BB": 3.96,
    //         "BY": 52.89,
    //         "BE": 461.33
    //     }
    // );
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