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
    origin: 'http://localhost:8443',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), function(req, res){
    res.sendFile(path.join(__dirname+"/api/junk.html"));
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
                con.end();
            }
        });
    });
});

app.get('/get-vert-data', cors(corsOptions), function(req, res){

    res.setHeader('Content-Type', 'application/json');
    let query;

    if(req.query['type'] === "geo")
    {
        query = "select location as data, count(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }
    else if(req.query['type'] === "ports")
    {
        query = "select dst_port as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }
    else if(req.query['type'] === "services")
    {
        query = "select service as data, count(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }
    else if(req.query['type'] === "ip")
    {
        query = "select src_ip as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }

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
                    formatted_result += '"' + result[i]['data'] + '":' + result[i]['total_count'] + ',';
                }
                formatted_result += '"' + result[result.length - 1]['data'] + '":' + result[result.length - 1]['total_count'] + "}";
                let json_format = JSON.parse(formatted_result);
                res.json(json_format);
                con.end();
            }
        });
    });
});


app.get('/get-pie-data', cors(corsOptions), function(req, res){


    res.setHeader('Content-Type', 'application/json');
    let query;

    if(req.query['type'] === "geo")
    {
        query = "select location as data, count(*) as total_count FROM connections GROUP BY data ORDER BY total_count DESC LIMIT 5;";
    }
    else if(req.query['type'] === "ports")
    {
        query = "select dst_port as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }
    else if(req.query['type'] === "services")
    {
        query = "select service as data, count(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }
    else if(req.query['type'] === "ip")
    {
        query = "select src_ip as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }
    else if(req.query['type'] === "username")
    {
        query = "select src_ip as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }
    else if(req.query['type'] === "password")
    {
        query = "select src_ip as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
    }

    var total = 0;

    const con = mysql.createConnection({
        host: "db_honey",
        user: "web",
        password: "P@ssw0rd",
        database: "honeywall"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result) {
            let formatted_result = '[';
            if (err) throw err;
            else {
                let i;
                for (i = 0; i < result.length; i++) {
                    total = total + result[i]['total_count'];
                }
                for (i = 0; i < result.length - 1; i++) {
                    formatted_result += '{name: "' + result[i]['data'] + '", share: ' + (result[i]['total_count'] / total) + '},';
                }
                formatted_result += '{name: "' + result[result.length - 1]['data'] + '", share: ' + (result[result.length - 1]['total_count'] / total) + "}]";
                let json_format = JSON.parse(formatted_result);
                res.json(json_format);
                con.end();
            }
        });
    });


    res.setHeader('Content-Type', 'application/json');
    res.json([
            {name: "Alex", share: 20.70},
            {name: "Shelly", share: 30.92},
            {name: "Clark", share: 15.42},
            {name: "Matt", share: 13.65},
            {name: "Jolene", share: 9.655},
            {name: "Test", share: 9.655}
        ]
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