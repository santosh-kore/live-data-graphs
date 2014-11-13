var Watcher = require('file-watch');

var watcher = new Watcher();

watcher.watch('custom event', [__dirname + "data/graph-data.txt"]);

watcher.on('custom event', function () {
  console.log('custom event!')
});