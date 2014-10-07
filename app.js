var express = require('express');
var app = express();
var fs = require('fs');
var child_process = require('child_process');

app.use('/_file/', express.static('./', {index: false}));

app.use('/', function(req, res, next) {
  if (req.path === '/' || (req.path.substr(6) !== '/_file' && fs.statSync(unescape(req.path).substr(1)).isDirectory())) {
  fs.readdir('./' + unescape(req.path).substr(1), function(err, files) {
    var ret = '';
    for (var i = 0; i < files.length; i++) {
       res.write('<a href="' + unescape(req.path).substr(1) + '/' + files[i] + '">' + files[i] + '</a><br/>');
    }
    res.end();
  });
  } else {
    next();
  }
});

var proc;
app.get(/.*/, function(req, res) {
  var path = unescape(req.path).substr(1);
  //res.send(path);
  if (proc) {
    proc.kill('SIGKILL');
  }
  var args = ['http://ksmythatv:' + server.address().port + '/_file/' + path, '-o', 'Apple-TV.local'];
  console.log(args);
  proc = child_process.execFile('/usr/local/bin/airstream', args, function(err, stdout, stderr) {
    console.log('exited: ' + err);
    proc = null;
  });
  res.send('ok');
});


var server = app.listen(8011, function() {
    console.log('Listening on port %d', server.address().port);
});
