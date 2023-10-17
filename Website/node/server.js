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
        } else if (req.query['type'] === "username") {
            query = "select username as data, count(*) as total_count FROM logins GROUP BY data ORDER BY total_count DESC LIMIT 8;";
        } else if (req.query['type'] === "password") {
            query = "select password as data, count(*) as total_count FROM logins GROUP BY data ORDER BY total_count DESC LIMIT 8;";
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
        res.status(500).json({ error: 'No Data in Database' });
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
            query = "select username as data, count(*) as total_count FROM logins GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        } else if (req.query['type'] === "password") {
            query = "select password as data, count(*) as total_count FROM logins GROUP BY data ORDER BY total_count DESC LIMIT 5;";
        }
        const result = await db_query(query);
        let formatted_result = '[';
        for (let i = 0; i < result.length - 1; i++) {
            formatted_result += '{"name": "' + result[i]['data'] + '", "share": ' + result[i]['total_count'] + '},';
        }
        formatted_result += '{"name": "' + result[result.length - 1]['data'] + '", "share": ' + result[result.length - 1]['total_count'] + "}]";
        let json_format = JSON.parse(formatted_result);
        res.json(json_format);
    }
    catch (error){
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/get-latest-connection', cors(corsOptions), async function (req, res){
    res.setHeader('Content-Type', 'application/json');
    try {
        let query;
        query = "select * from connections ORDER BY id DESC LIMIT 10;";
        const result = await db_query(query);
        let formatted_result = '[';
        for (let i = 0; i < result.length - 1; i++) {
            formatted_result += '{"id": "' + result[i]['id'] + '", "dst_ip": "' + result[i]['dst_ip'] + '", "dst_port": ' + result[i]['dst_port'] + ', "src_ip": "' + result[i]['src_ip'] +'", ' + '"src_port": ' + result[i]["src_port"] + ', "date_time": "' + result[i]['date_time'] + '", "service": "' + result[i]["service"] + '", "location": "' + result[i]["location"] + '"},';
        }
        formatted_result += '{"id": "' + result[result.length - 1]['id'] + '", "dst_ip": "' + result[result.length - 1]['dst_ip'] + '", "dst_port": ' + result[result.length - 1]['dst_port'] + ', "src_ip": "' + result[result.length - 1]['src_ip'] +'", ' + '"src_port": ' + result[result.length - 1]["src_port"] + ', "date_time": "' + result[result.length - 1]['date_time'] + '", "service": "' + result[result.length - 1]["service"] + '", "location": "' + result[result.length - 1]["location"] + '"}';
        let json_format = JSON.parse(formatted_result);
        res.json(json_format);
    }
    catch (error){
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/get-chart-data', cors(corsOptions), async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {

        let query;

        query = "select DATE(date_time) AS time, COUNT(id) as total_connections FROM connections GROUP BY DATE(connections.date_time) ORDER BY time DESC LIMIT 7;";
        const result = await db_query(query);

        let formatted_result = '[';
        for (let i = result.length - 1; i > 0 ; i--) {
            let date_split = result[i]['time'].toString().split(" ");
            let date = date_split[0] + " " + date_split[1] + " " + date_split[2];
            formatted_result += '{"date_time": "' + date + '", "total_connections": ' + result[i]['total_connections'] + '},';
        }
        let date_split = result[0]['time'].toString().split(" ");
        let date = date_split[0] + " " + date_split[1] + " " + date_split[2];
        formatted_result += '{"date_time": "' + date + '", "total_connections": ' + result[0]['total_connections'] + "}]";
        let json_format = JSON.parse(formatted_result);
        res.json(json_format);
    } catch (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
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