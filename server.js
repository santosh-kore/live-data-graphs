var http = require('http');
    fs = require('fs'),
    path = require('path'),
    url = require('url');
var socketio = require('socket.io');
var server = http.createServer(function(req, res) {
    var urlData = url.parse(req.url, true);
    var absPath = path.join(__dirname, "public" + urlData.path);
    fs.exists(absPath, function (exists) {
        if(!exists) {
            res.statusCode = 404;
            res.end("<h1>File not found</h1>");
        } else {
            fs.readFile(absPath, {encoding: "utf8"}, function(err, data) {
                if (err) {
                    res.statusCode = 500;
                    res.end("Internal server error");
                }
                res.statusCode = 200;
                res.writeHead("content-type", "application/html");
                res.write(data);
                res.end();
            });
            
        }
    });
});

server.listen(9090);
io = socketio.listen(server);
io.sockets.on('connection', function (socket) {

	var fetchGraphData = function() {
		fs.exists("graph-data.txt", function (exists) {
	        if(exists) {
	            fs.readFile("graph-data.txt", {encoding: "utf8"}, function(err, graphSeriesist) {
	            	debugger
	            	var graphData = {series: [], data: []};
	            	graphSeriesist = graphSeriesist.split("\n");
	            	graphSeriesist.forEach(function(sr) {
	            		sr = sr.split(":");
	            		//if(sr[0] === "name") {
	            			graphData.series.push(sr[0]);
	            		//} else if(sr[0] === "data") {
	            			graphData.data.push(sr[1]);
	            		//}
	            	});
	            	if(graphData.series.length) {
            		    socket.emit('render-graph', {
					        graphData: graphData
					    });
	            	}
	            });
	            
	        }
	    });
	}

	socket.on('initial-graph-load', function(graph) {
		fetchGraphData();
	});
	
    fs.watchFile("graph-data.txt", function (curr, prev) {
		fetchGraphData();	    
	});

});

console.log("Server listening on 9090...");
