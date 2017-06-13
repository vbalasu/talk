# talk
Methods to talk to a remote server by invoking commands and returning results


These scripts allow powerful communications between client and server, which works as follows:
- User invokes client.js, which is built on Node JS
- Client.js makes  a call to server.js, which is a websocket server running at http://54.152.42.238:3000/ (Cloudmatica reportserver on AWS EC2)
- STDIN from client.js is passed as a websocket message to server.js. Server.js writes it to stdin.txt on the server
- Parameters to client.js contain a command to be executed on the server
- Server.js runs the command, and sends the outputs back to the client as a websocket message (STDOUT = output, STDERR = errormsg)
- Client.js returns the outputs to the console
- You can also communicate to the server using a web interface at the above url

Examples

node client.js dir		- show the directory on the server

node client.js time /t		- show the current time on the server

echo HELLO | node client.js copy stdin.txt hello.txt	- uploads some text to the server

type help.txt | node client.js copy stdin.txt help2.txt	- uploads a local file to the server 

node client.js sqlite3 –help	- Invokes sqlite3 command line
