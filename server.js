var http = require('http');

var staicFileServer = require('./libs/serve_static_files');
var server = http.createServer(function(req, res) {
	staicFileServer.serveStatisFiles(req, res, __dirname);
});

server.listen(9090);

var graphDataServer = require('./libs/socket');
graphDataServer.listen(server);

console.log("Server listening on 9090...");
