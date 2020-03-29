const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const publicDirectoryPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server );

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socket.emit('message', 'Welcome!!!');

    socket.broadcast.emit('message', 'A new user has joined!');

    // callback recieves the acknowledgement whether the message is delivered or not
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        io.emit('message', message);
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log('Server is listening at port ', port);
})