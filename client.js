require('dotenv').config();
const socket = io(`http://localhost:{$PORT}`);

const msgContainer = document.getElementById('message-container');
const msgForm = document.getElementById('send-container');
const msgInput = document.getElementById('message-input');

const name = prompt('What is your name?');


appendMessage('You Joined!');
socket.emit('new-user', name);

socket.on('chat-message', data =>{
	appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name =>{
	appendMessage(`${name} connected :)`);
});

socket.on('user-disconnected', name =>{
	appendMessage(`${name} disconnected :(`);
});

socket.on('user-disconnected', name =>{
	appendMessage(`${name} disconnected :(`);
});





msgForm.addEventListener('submit', event =>{
	event.preventDefault();
	const message = msgInput.value;
	appendMessage(`You: ${message}`);
	socket.emit('send-chat-message', message)
	msgInput.value ='';
});



function appendMessage(message){
	const messageContent = document.createElement('div');
	messageContent.innerText = message;
	msgContainer.append(messageContent);
};