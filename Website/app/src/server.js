const http = require("http");
const fs = require('fs').promises;

// Constants
const port = process.env.PORT || "8000";
const host = '0.0.0.0';

const requestListener = function (req, res) {
    fs.readFile(__dirname + "/html/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
        });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});