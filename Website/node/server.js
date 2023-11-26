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
    password: "xDQKd4wKWJO8YOCT7VALbdCX905DS1p",
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
            query = "select location as data, count(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 15;";
        } else if (req.query['type'] === "dst_port") {
            query = "select dst_port as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 15;";
        } else if (req.query['type'] === "service") {
            query = "select service as data, count(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 15;";
        } else if (req.query['type'] === "src_ip") {
            query = "select src_ip as data,COUNT(*) as total_count from connections GROUP BY data ORDER BY total_count DESC LIMIT 15;";
        } else if (req.query['type'] === "username") {
            query = "select username as data, count(*) as total_count FROM logins GROUP BY data ORDER BY total_count DESC LIMIT 15;";
        } else if (req.query['type'] === "password") {
            query = "select password as data, count(*) as total_count FROM logins GROUP BY data ORDER BY total_count DESC LIMIT 15;";
        }
        else {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const result = await db_query(query);
        let formatted_result = '{';
        let data;
        for (let i = 0; i < result.length - 1; i++) {
            if(req.query['type'] === "location")
            {
                data = getCountryName(result[i]['data']);
            }
            else
            {
                data = result[i]['data'];
            }
            formatted_result += '"' + data + '":' + result[i]['total_count'] + ',';
        }
        if(req.query['type'] === "location")
        {
            data = getCountryName(result[result.length - 1]['data']);
        }
        else
        {
            data = result[result.length - 1]['data'];
        }
        formatted_result += '"' + data + '":' + result[result.length - 1]['total_count'] + "}";
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
        else {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const result = await db_query(query);
        let formatted_result = '[';
        let data;
        for (let i = 0; i < result.length - 1; i++) {
            if(req.query['type'] === "location")
            {
                data = getCountryName(result[i]['data']);
            }
            else
            {
                data = result[i]['data'];
            }
            formatted_result += '{"name": "' + data + '", "share": ' + result[i]['total_count'] + '},';
        }
        if(req.query['type'] === "location")
        {
            data = getCountryName(result[result.length - 1]['data']);
        }
        else
        {
            data = result[result.length - 1]['data'];
        }
        formatted_result += '{"name": "' + data + '", "share": ' + result[result.length - 1]['total_count'] + "}]";
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
        query = "SELECT connections.id AS id, connections.dst_port AS dst_port, connections.src_ip AS src_ip, connections.src_port AS src_port, connections.date_time AS date_time, connections.service AS service, connections.location AS location, logins.username as username, logins.password AS password FROM connections RIGHT JOIN logins ON connections.id=logins.id ORDER BY ID DESC LIMIT 25;";
        const result = await db_query(query);
        let formatted_result = '[';
        for (let i = 0; i < result.length - 1; i++) {
            let date_split = result[i]['date_time'].toString().split(" ");
            let time = date_split[4].toString();
            let date = date_split[0] + " " + date_split[1] + " " + date_split[2];
            let country = getCountryName(result[i]["location"])
            formatted_result += '{"Time": "' + time + " " + date + '", "Service": "' + result[i]['service'] + ":" + result[i]['dst_port'] + '", ' + '"Source": "' + result[i]["src_ip"] + ":" + result[i]['src_port'] + '", "Location": "' + country + '", "Username": "'+ result[i]["username"] + '", "Password":"'+ result[i]["password"] + '"},';
        }
        let date_split = result[result.length - 1]['date_time'].toString().split(" ");
        let time = date_split[4].toString();
        let date = date_split[0] + " " + date_split[1] + " " + date_split[2];
        let country = getCountryName(result[result.length - 1]["location"])
        formatted_result += '{"Time": "' + time + " " + date + '", "Service": "' + result[result.length - 1]['service'] + ":" + result[result.length - 1]['dst_port'] + '", ' + '"Source": "' + result[result.length - 1]["src_ip"] + ":" + result[result.length - 1]['src_port'] + '", "Location": "' + country + '", "Username": "'+ result[result.length - 1]["username"] + '", "Password":"'+ result[result.length - 1]["password"] + '"}]';
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

function getCountryName (countryCode) {

    var isoCountries = {
        'AF' : 'Afghanistan',
        'AX' : 'Aland Islands',
        'AL' : 'Albania',
        'DZ' : 'Algeria',
        'AS' : 'American Samoa',
        'AD' : 'Andorra',
        'AO' : 'Angola',
        'AI' : 'Anguilla',
        'AQ' : 'Antarctica',
        'AG' : 'Antigua And Barbuda',
        'AR' : 'Argentina',
        'AM' : 'Armenia',
        'AW' : 'Aruba',
        'AU' : 'Australia',
        'AT' : 'Austria',
        'AZ' : 'Azerbaijan',
        'BS' : 'Bahamas',
        'BH' : 'Bahrain',
        'BD' : 'Bangladesh',
        'BB' : 'Barbados',
        'BY' : 'Belarus',
        'BE' : 'Belgium',
        'BZ' : 'Belize',
        'BJ' : 'Benin',
        'BM' : 'Bermuda',
        'BT' : 'Bhutan',
        'BO' : 'Bolivia',
        'BA' : 'Bosnia And Herzegovina',
        'BW' : 'Botswana',
        'BV' : 'Bouvet Island',
        'BR' : 'Brazil',
        'IO' : 'British Indian Ocean Territory',
        'BN' : 'Brunei Darussalam',
        'BG' : 'Bulgaria',
        'BF' : 'Burkina Faso',
        'BI' : 'Burundi',
        'KH' : 'Cambodia',
        'CM' : 'Cameroon',
        'CA' : 'Canada',
        'CV' : 'Cape Verde',
        'KY' : 'Cayman Islands',
        'CF' : 'Central African Republic',
        'TD' : 'Chad',
        'CL' : 'Chile',
        'CN' : 'China',
        'CX' : 'Christmas Island',
        'CC' : 'Cocos (Keeling) Islands',
        'CO' : 'Colombia',
        'KM' : 'Comoros',
        'CG' : 'Congo',
        'CD' : 'Congo, Democratic Republic',
        'CK' : 'Cook Islands',
        'CR' : 'Costa Rica',
        'CI' : 'Cote D\'Ivoire',
        'HR' : 'Croatia',
        'CU' : 'Cuba',
        'CY' : 'Cyprus',
        'CZ' : 'Czech Republic',
        'DK' : 'Denmark',
        'DJ' : 'Djibouti',
        'DM' : 'Dominica',
        'DO' : 'Dominican Republic',
        'EC' : 'Ecuador',
        'EG' : 'Egypt',
        'SV' : 'El Salvador',
        'GQ' : 'Equatorial Guinea',
        'ER' : 'Eritrea',
        'EE' : 'Estonia',
        'ET' : 'Ethiopia',
        'FK' : 'Falkland Islands',
        'FO' : 'Faroe Islands',
        'FJ' : 'Fiji',
        'FI' : 'Finland',
        'FR' : 'France',
        'GF' : 'French Guiana',
        'PF' : 'French Polynesia',
        'TF' : 'French Southern Territories',
        'GA' : 'Gabon',
        'GM' : 'Gambia',
        'GE' : 'Georgia',
        'DE' : 'Germany',
        'GH' : 'Ghana',
        'GI' : 'Gibraltar',
        'GR' : 'Greece',
        'GL' : 'Greenland',
        'GD' : 'Grenada',
        'GP' : 'Guadeloupe',
        'GU' : 'Guam',
        'GT' : 'Guatemala',
        'GG' : 'Guernsey',
        'GN' : 'Guinea',
        'GW' : 'Guinea-Bissau',
        'GY' : 'Guyana',
        'HT' : 'Haiti',
        'HM' : 'Heard Island & McDonald Islands',
        'VA' : 'Vatican City State',
        'HN' : 'Honduras',
        'HK' : 'Hong Kong',
        'HU' : 'Hungary',
        'IS' : 'Iceland',
        'IN' : 'India',
        'ID' : 'Indonesia',
        'IR' : 'Iran',
        'IQ' : 'Iraq',
        'IE' : 'Ireland',
        'IM' : 'Isle Of Man',
        'IL' : 'Israel',
        'IT' : 'Italy',
        'JM' : 'Jamaica',
        'JP' : 'Japan',
        'JE' : 'Jersey',
        'JO' : 'Jordan',
        'KZ' : 'Kazakhstan',
        'KE' : 'Kenya',
        'KI' : 'Kiribati',
        'KR' : 'Korea',
        'KW' : 'Kuwait',
        'KG' : 'Kyrgyzstan',
        'LA' : 'Lao People\'s Democratic Republic',
        'LV' : 'Latvia',
        'LB' : 'Lebanon',
        'LS' : 'Lesotho',
        'LR' : 'Liberia',
        'LY' : 'Libyan Arab Jamahiriya',
        'LI' : 'Liechtenstein',
        'LT' : 'Lithuania',
        'LU' : 'Luxembourg',
        'MO' : 'Macao',
        'MK' : 'Macedonia',
        'MG' : 'Madagascar',
        'MW' : 'Malawi',
        'MY' : 'Malaysia',
        'MV' : 'Maldives',
        'ML' : 'Mali',
        'MT' : 'Malta',
        'MH' : 'Marshall Islands',
        'MQ' : 'Martinique',
        'MR' : 'Mauritania',
        'MU' : 'Mauritius',
        'YT' : 'Mayotte',
        'MX' : 'Mexico',
        'FM' : 'Micronesia',
        'MD' : 'Moldova',
        'MC' : 'Monaco',
        'MN' : 'Mongolia',
        'ME' : 'Montenegro',
        'MS' : 'Montserrat',
        'MA' : 'Morocco',
        'MZ' : 'Mozambique',
        'MM' : 'Myanmar',
        'NA' : 'Namibia',
        'NR' : 'Nauru',
        'NP' : 'Nepal',
        'NL' : 'Netherlands',
        'AN' : 'Netherlands Antilles',
        'NC' : 'New Caledonia',
        'NZ' : 'New Zealand',
        'NI' : 'Nicaragua',
        'NE' : 'Niger',
        'NG' : 'Nigeria',
        'NU' : 'Niue',
        'NF' : 'Norfolk Island',
        'MP' : 'Northern Mariana Islands',
        'NO' : 'Norway',
        'OM' : 'Oman',
        'PK' : 'Pakistan',
        'PW' : 'Palau',
        'PS' : 'Palestine',
        'PA' : 'Panama',
        'PG' : 'Papua New Guinea',
        'PY' : 'Paraguay',
        'PE' : 'Peru',
        'PH' : 'Philippines',
        'PN' : 'Pitcairn',
        'PL' : 'Poland',
        'PT' : 'Portugal',
        'PR' : 'Puerto Rico',
        'QA' : 'Qatar',
        'RE' : 'Reunion',
        'RO' : 'Romania',
        'RU' : 'Russia',
        'RW' : 'Rwanda',
        'BL' : 'Saint Barthelemy',
        'SH' : 'Saint Helena',
        'KN' : 'Saint Kitts And Nevis',
        'LC' : 'Saint Lucia',
        'MF' : 'Saint Martin',
        'PM' : 'Saint Pierre And Miquelon',
        'VC' : 'Saint Vincent And Grenadines',
        'WS' : 'Samoa',
        'SM' : 'San Marino',
        'ST' : 'Sao Tome And Principe',
        'SA' : 'Saudi Arabia',
        'SN' : 'Senegal',
        'RS' : 'Serbia',
        'SC' : 'Seychelles',
        'SL' : 'Sierra Leone',
        'SG' : 'Singapore',
        'SK' : 'Slovakia',
        'SI' : 'Slovenia',
        'SB' : 'Solomon Islands',
        'SO' : 'Somalia',
        'ZA' : 'South Africa',
        'GS' : 'South Georgia And Sandwich Isl.',
        'ES' : 'Spain',
        'LK' : 'Sri Lanka',
        'SD' : 'Sudan',
        'SR' : 'Suriname',
        'SJ' : 'Svalbard And Jan Mayen',
        'SZ' : 'Swaziland',
        'SE' : 'Sweden',
        'CH' : 'Switzerland',
        'SY' : 'Syria',
        'TW' : 'Taiwan',
        'TJ' : 'Tajikistan',
        'TZ' : 'Tanzania',
        'TH' : 'Thailand',
        'TL' : 'Timor-Leste',
        'TG' : 'Togo',
        'TK' : 'Tokelau',
        'TO' : 'Tonga',
        'TT' : 'Trinidad And Tobago',
        'TN' : 'Tunisia',
        'TR' : 'Turkey',
        'TM' : 'Turkmenistan',
        'TC' : 'Turks And Caicos Islands',
        'TV' : 'Tuvalu',
        'UG' : 'Uganda',
        'UA' : 'Ukraine',
        'AE' : 'United Arab Emirates',
        'GB' : 'United Kingdom',
        'US' : 'United States',
        'UM' : 'United States Outlying Islands',
        'UY' : 'Uruguay',
        'UZ' : 'Uzbekistan',
        'VU' : 'Vanuatu',
        'VE' : 'Venezuela',
        'VN' : 'Vietnam',
        'VG' : 'Virgin Islands, British',
        'VI' : 'Virgin Islands, U.S.',
        'WF' : 'Wallis And Futuna',
        'EH' : 'Western Sahara',
        'YE' : 'Yemen',
        'ZM' : 'Zambia',
        'ZW' : 'Zimbabwe',
        '-' : 'Local IP'
    };

    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
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