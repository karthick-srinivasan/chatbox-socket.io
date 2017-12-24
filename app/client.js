/**
 * Client side js to host web socket on the browser
 * @Author: Karthick Srinivasan
 */

//Host a connection
var socket = io.connect('http://localhost:1010');

var messageArea = document.getElementById('msgarea');
var sender = document.getElementById('sender');
var message = document.getElementById('message');
var sendBtn = document.getElementById('send');
var typing = document.getElementById('typing');

//Event listener for Send btn
sendBtn.addEventListener('click', function() {
	socket.emit('chatOn', {
		sender: sender.value,
		message: message.value
	});
});

//Event handler for server msg
socket.on('chat', function(data) {
	typing.innerHTML = '';
	output.innerHTML += '<p><strong>'+data.sender+ '</strong>: '+data.message+'</p>';
});

message.addEventListener('keypress', function() {
	socket.emit('typing', sender.value);
});

socket.on('typing', function(data) {
	typing.innerHTML = '<p>'+data+' is typing...</p>';
})