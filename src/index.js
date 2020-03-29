const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const publicDirectoryPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server );

app.use(express.static(publicDirectoryPath));

io.on('connection', () => {
    console.log('New WebSocket connection');
})

server.listen(port, () => {
    console.log('Server is listening at port ', port);
})