const http = require('http');

var server = http.createServer(function () {
    console.log("有人来了");
});


server.listen(8080);