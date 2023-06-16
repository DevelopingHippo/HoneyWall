// Constants
const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
const path = require("path");
const router = express.Router();

// Index Page
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"app/index.html"));
});
// Dashboard
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"app/index.html"));
});



app.use(express.static('/var/www/node/app'))
app.use('/', router)
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});