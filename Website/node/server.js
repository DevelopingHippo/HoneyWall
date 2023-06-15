// Constants
const express = require('express');

const PORT = 3000;
const HOST = '127.0.0.1';

// App
const app = express();
const path = require("path");
const router = express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/var/www/node/index.html"));
});

app.use(express.static('/var/www/node/'))
app.use('/', router)
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});