exports.resourceNotFound = 
	function(req, res) {
		res.statusCode = 404;
        res.end("<h1>File not found</h1>");
	}

exports.internalServerError = 
	function(req, res) {
		res.statusCode = 500;
        res.end("Internal server error");
	}