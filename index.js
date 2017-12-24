/**
 * Server side js to handle requests
 * @Author: Karthick Srinivasan
 */

var express = require('express');

var socket = require('socket.io');

var app = express();

app.use(express.static('app'));

const PORT = 1010;
var server = app.listen(PORT, function() {
	console.log('Listening to the port: '+ PORT);
});

var io = socket(server);

//Event handler for client msgs
io.on('connection', function(socket) {

	console.log("Chat connection made to "+ socket.id);

	socket.on('chatOn', function(data) {
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data);
	})
});