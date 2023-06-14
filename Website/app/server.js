// Constants
const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('www'))

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});