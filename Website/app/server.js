// Constants
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const path = require("path");
const router = express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/html/index.html"));
});

app.use(express.static('www'))
app.use('/', router)
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});