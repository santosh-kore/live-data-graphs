var  fs = require('fs');
var	socketio = require('socket.io');

exports.listen = function(server) {
	io = socketio.listen(server);
	io.sockets.on('connection', function (socket) {
		socket.on('initial-graph-load', function(graph) {
			fetchGraphData(socket);
		});
	    fs.watchFile("graph-data.txt", function (curr, prev) {
			fetchGraphData(socket);	    
		});
	});
}

var fetchGraphData = function(socket) {
	fs.exists("graph-data.txt", function (exists) {
        if(exists) {
            fs.readFile("graph-data.txt", {encoding: "utf8"}, function(err, graphSeriesist) {
            	var graphData = {series: [], data: []};
            	graphSeriesist = graphSeriesist.split("\n");
            	graphSeriesist.forEach(function(sr) {
            		sr = sr.split(":");
            		graphData.series.push(sr[0]);
            		graphData.data.push(sr[1]);
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