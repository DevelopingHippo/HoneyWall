// Constants
const express = require('express');
const mysql = require('mysql');
//const http2 = require('http2')
//const { readFileSync } = require('fs')


const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
const path = require("path");
const cors = require('cors');

const db_config = {
    host: "db_honey",
    user: "web",
    password: "P@ssw0rd",
    database: "honeywall"
};

const db_pool = mysql.createPool(db_config);

// const options = {
//     key: readFileSync('key.key'),
//     cert: readFileSync('cert.pem'),
//     allowHTTP1: true
// }
const corsOptions = {
    origin: 'http://localhost:8443',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/', cors(corsOptions), function(req, res){
    res.sendFile(path.join(__dirname+"/api/junk.html"));
});


app.get('/get-map-data', cors(corsOptions), async function (req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        let query = "SELECT location, count(location) AS total_connections FROM connections GROUP BY location;";
        const result = await db_query(query);
        let formatted_result = '{';
        for (var i = 0; i < result.length - 1; i++) {
            formatted_result += '"' + result[i]['location'] + '":' + result[i]['total_connections'] + ',';
        }
        formatted_result += '"' + result[result.length - 1]['location'] + '":' + result[result.length - 1]['total_connections'] + "}";
        let json_format = JSON.parse(formatted_result);
        res.json(json_format);
    }
    catch (error)
    {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get-vert-data', cors(corsOptions), async function (req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        let query;
        if (req.query['type'] === "location") {
            query = "select location as data, count(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
        } else if (req.query['type'] === "dst_port") {
            query = "select dst_port as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
        } else if (req.query['type'] === "service") {
            query = "select service as data, count(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
        } else if (req.query['type'] === "src_ip") {
            query = "select src_ip as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 8;";
        }

        const result = await db_query(query);
        let formatted_result = '{';
        for (let i = 0; i < result.length - 1; i++) {
            formatted_result += '"' + result[i]['data'] + '":' + result[i]['total_count'] + ',';
        }
        formatted_result += '"' + result[result.length - 1]['data'] + '":' + result[result.length - 1]['total_count'] + "}";
        let json_format = JSON.parse(formatted_result);
        res.json(json_format);

    }
    catch (error){
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/get-pie-data', cors(corsOptions), async function (req, res) {

    try {
        res.setHeader('Content-Type', 'application/json');
        let query;

        if (req.query['type'] === "location") {
            query = "select location as data, count(*) as total_count FROM connections GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        } else if (req.query['type'] === "dst_port") {
            query = "select dst_port as data, count(*) as total_count FROM connections GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        } else if (req.query['type'] === "service") {
            query = "select service as data, count(*) as total_count FROM connections GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        } else if (req.query['type'] === "src_ip") {
            query = "select src_ip as data, count(*) as total_count FROM connections GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        } else if (req.query['type'] === "username") {
            query = "select username as data, count(*) as total_count FROM connections GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        } else if (req.query['type'] === "password") {
            query = "select password as data, count(*) as total_count FROM connections GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        }
        let total = 0.00;
        const result = await db_query(query);
        let formatted_result = '[';
        for (let i = 0; i < result.length; i++) {
            total = total + parseFloat(result[i]['total_count']);
        }
        for (let i = 0; i < result.length - 1; i++) {
            formatted_result += '{"name": "' + result[i]['data'] + '", "share": ' + result[i]['total_count'] + '},';
        }
        formatted_result += '{"name": "' + result[result.length - 1]['data'] + '", "share": ' + ((parseFloat(result[result.length - 1]))) + "}]";
        let json_format = JSON.parse(formatted_result);
        res.json(json_format);
    }
    catch (error){
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/get-chart-data', cors(corsOptions), function (req, res) {
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

// Function to execute database queries
function db_query(sql, params) {
    return new Promise((resolve, reject) => {
        db_pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Function to close the database connection (optional)
function closeConnection() {
    db_pool.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed successfully.');
        }
    });
}


// const server = http2.createSecureServer(options, app)
// server.listen(PORT)
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});