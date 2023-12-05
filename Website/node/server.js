const { get_chart_data, get_map_data, get_pie_data, get_vert_data, get_latest_data } = require('./get-data');
// Constants
const express = require('express');
const mysql = require('mysql');

const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
const cors = require('cors');

const db_config = {
    host: "db_honey",
    user: "web",
    password: "xDQKd4wKWJO8YOCT7VALbdCX905DS1p",
    database: "honeywall"
};

const db_pool = mysql.createPool(db_config);
// Function to execute database queries

const corsOptions = {
    origin: 'http://localhost:8443',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

let map_data = {};
let chart_data = {};
let latest_data = {};

let service_vert_data = {};
let location_vert_data = {};
let username_vert_data = {};
let password_vert_data = {};
let dstPort_vert_data = {};
let srcIP_vert_data = {};

let service_pie_data = {};
let location_pie_data = {};
let username_pie_data = {};
let password_pie_data = {};
let dstPort_pie_data = {};
let srcIP_pie_data = {};


app.get('/get-map-data', cors(corsOptions), async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json(map_data);
});

app.get('/get-vert-data', cors(corsOptions), async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let query;
    if (req.query['type'] === "location") {
        res.json(location_vert_data);
    } else if (req.query['type'] === "dst_port") {
        res.json(dstPort_vert_data);
    } else if (req.query['type'] === "service") {
        res.json(service_vert_data);
    } else if (req.query['type'] === "src_ip") {
        res.json(srcIP_vert_data);
    } else if (req.query['type'] === "username") {
        res.json(username_vert_data);
    } else if (req.query['type'] === "password") {
        res.json(password_vert_data);
    }
    else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/get-pie-data', cors(corsOptions), async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query['type'] === "location") {
        res.json(location_pie_data);
    } else if (req.query['type'] === "dst_port") {
        res.json(dstPort_pie_data);
    } else if (req.query['type'] === "service") {
        res.json(service_pie_data);
    } else if (req.query['type'] === "src_ip") {
        res.json(srcIP_pie_data);
    } else if (req.query['type'] === "username") {
        res.json(username_pie_data);
    } else if (req.query['type'] === "password") {
        res.json(password_pie_data);
    }
   else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/get-latest-connection', cors(corsOptions), async function (req, res){
    res.setHeader('Content-Type', 'application/json');
    res.json(latest_data);
});


app.get('/get-chart-data', cors(corsOptions), async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json(chart_data);
});


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

setInterval(() => {
    get_chart_data(30, db_pool).then((data) => {
        chart_data = data;
    });
    get_map_data(db_pool).then((data) => {
        map_data = data;
    });
    get_latest_data('25', db_pool).then((data) => {
        latest_data = data;
    });
    get_pie_data('location', db_pool).then((data) => {
        location_pie_data = data;
    });
    get_pie_data('service', db_pool).then((data) => {
        service_pie_data = data;
    });
    get_pie_data('username', db_pool).then((data) => {
        username_pie_data = data;
    });
    get_pie_data('password', db_pool).then((data) => {
        password_pie_data = data;
    });
    get_pie_data('dst_port', db_pool).then((data) => {
        dstPort_pie_data = data;
    });
    get_pie_data('src_ip', db_pool).then((data) => {
        srcIP_pie_data = data;
    });
    get_vert_data('location', db_pool).then((data) => {
        location_vert_data = data;
    });
    get_vert_data('service', db_pool).then((data) => {
        service_vert_data = data;
    });
    get_vert_data('username', db_pool).then((data) => {
        username_vert_data = data;
    });
    get_vert_data('password', db_pool).then((data) => {
        password_vert_data = data;
    });
    get_vert_data('dst_port', db_pool).then((data) => {
        dstPort_vert_data = data;
    });
    get_vert_data('src_ip', db_pool).then((data) => {
        srcIP_vert_data = data;
    });
}, 10000);


app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});