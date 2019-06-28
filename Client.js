/*var io = require('socket.io-client'),
socket = io.connect('172.17.20.110', {
    port: 3000
});
socket.on('connect', function () { console.log("socket connected"); });
socket.emit('private message', { user: 'me', msg: 'whazzzup?' });

*/

var net = require('net');

var client = new net.Socket();
client.connect(3000, '192.168.0.24', function() {
	console.log('Connected');
	client.write('Milton.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	//client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});