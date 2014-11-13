var fs = require('fs');
var path = require('path');
var url = require('url');
var errorHandler = require('./error_handler');

exports.serveStatisFiles = function(req, res, rootDir) {
    var urlData = url.parse(req.url, true);
    var absPath = path.join(rootDir, "public" + urlData.path);

    fs.exists(absPath, function (exists) {
        if(!exists) {
            errorHandler.resourceNotFound(req, res);
        } else {
            fs.readFile(absPath, {encoding: "utf8"}, function(err, data) {
                if (err) {
                    errorHandler.internalServerError(req, res);
                }
                res.statusCode = 200;
                res.writeHead("content-type", "application/html");
                res.write(data);
                res.end();
            });
            
        }
    });
}


