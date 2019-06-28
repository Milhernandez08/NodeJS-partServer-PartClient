var express = require('express');
var app = express();

var net = require('net');
var server = require('http').Server(app);

var io = require('socket.io')(server);

var os = require('os');

console.log('socket ok \n')

var interfaces = os.networkInterfaces();
var addres = [];

for (var k in interfaces){
    for (var k2 in interfaces[k]){
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal){
            addres.push(address.address);
        }
    }
}

var HOST = addres[0];

var PORT = 3000;

io.on('connection', function (socket){
    console.log(socket);
});

var clientes = [];
var OneCliente = '';
var opcion = 0 // 1 = IP, 0 = PUERTOS

net.createServer(function(socket){
    console.log('Cliente nuevo: ' + socket.remoteAddress + ":" + socket.remotePort);
    var sujeto = '';
    if (opcion === 1) {
        OneCliente = socket.remoteAddress; // Se obtiene al cliente nuevo
        sujeto = "El cliente con IP " + OneCliente + " envio: ";
    }
    else{
        OneCliente = socket.remotePort;
        sujeto = "El cliente con PUERTO " + OneCliente + " envio: ";
    }
    
    clientes.push(OneCliente); // Se almacena al cliente en la lista de clientes

    console.log('\n\n\t\tEstos Clientes estan conectados { ', clientes, ' }\n\n');

    socket.write('Mensaje enviado desde el SERVIDOR!');
    
    //socket.pipe(socket);

    socket.on('data', function (data) {
        console.log(sujeto + '  ' + data.toString() + ' -');
    });

    socket.on('close', function(){
        var desClient = '';
        if (opcion === 1){
            desClient = socket.remoteAddress; // Para direcciones IP
        }
        else{
            desClient = socket.remotePort; // Para direcciones IP
        }
        //var desClient = socket.remotePort; // Para Puertos
                
        console.log('\n\nEL CLIENTE ' + desClient + ' SE DESCONECTO ');
        var index = clientes.indexOf(desClient);
        clientes.splice(index, 1);
        console.log('\n\n\t\tEstos Clientes estan conectados { ', clientes, ' }');
    });


}).listen(PORT, HOST)



// Investigar conexcion close de socket en node js y agregarlo °
// Crear un cliente en node js y conectarlo al servidor °
// Responder del servidor al cliente °
// Decodificar los mensajes que llegan al servidor a texto °
// Agregar clientes conectados e imprimir °
// Verificar que cliente se desconecto y eliminarlo de la lista de clientes conectados °
// Imprimir nuevamente la lista de conectados °

// ********* PARA PREPARAR EL PROYECTO *********
// Instalar nodemon a su proyecto
// gitignore 