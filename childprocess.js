/* USAGE: node childprocess.js sqlite3 temp.db ".help"  
   Executes a child process and saves stdout, stderr, args and exitcode in the childprocess folder
   The stdin stream of the parent process is piped to the child process
*/
u = require('uuid/v4');
var filename = 'childprocess/'+u()+'_';
var fs = require('fs');

console.log(filename+'args.txt');
var args = process.argv;
args.shift();
args.shift();
args.unshift('/c');
fs.appendFile(filename+'args.txt', JSON.stringify(args));
const spawn = require('child_process').spawn;
const childproc = spawn('cmd.exe', args);

 process.stdin.resume();
 process.stdin.pipe(childproc.stdin, { end: false });
 childproc.on('exit', function (code) {
   console.log(filename+'exitcode.txt');
   fs.appendFileSync(filename+'exitcode.txt', code);
   process.exit(code);
 });

childproc.stdout.on('data', (data) => {
  console.log(filename+'stdout.txt');
  fs.appendFile(filename+'stdout.txt', data);
});

childproc.stderr.on('data', (data) => {
  console.error(filename+'stderr.txt');
  fs.appendFile(filename+'stderr.txt', data);
});
