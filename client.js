//var socket = require('socket.io-client')('http://54.152.42.238:3000');
var socket = require('socket.io-client')('http://localhost:3000');
const getStdin = require('get-stdin');
if(process.argv.length < 3) {
	console.error('Syntax: client <command> [<args>]');
	process.exit();
}
var args = process.argv;
args.shift();
args.shift();


socket.on('connect', function(){ 
	console.error('Connected'); 
	getStdin().then(str => { 
		socket.emit('stdin', str); 
		socket.emit('chat message', args.join(' '));
	});
});
socket.on('errormsg', function(data){ 
	console.error(data);
	socket.disconnect();
	//process.exit();
});
socket.on('output', function(data){ 
	console.log(data); 
	//socket.disconnect();
	//process.exit();
});
socket.on('disconnect', function(){ console.error('Disconnected'); });
