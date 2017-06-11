var exec = require('child_process').exec;
var cmd = 'cmd.exe /c dir';

exec(cmd, function(error, stdout, stderr) {
  console.log(stdout);
});