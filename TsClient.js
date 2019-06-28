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