var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(3000, '192.168.0.24');