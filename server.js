/*
Websocket server that runs at port 3000. It listens to incoming commands and returns the output and errors
as socket.io messages
*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
	var exec = require('child_process').exec;
	var cmd = 'cmd.exe /c '+msg;

	exec(cmd, function(error, stdout, stderr) {
	  if(error) {
		  console.error(stderr);
		  socket.emit('errormsg', stderr);
	  } else {
		  	console.log(stdout);
			socket.emit('output', stdout);

	  }
	});

	});
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});
/* Go to http://localhost:3000  */