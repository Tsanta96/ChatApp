const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
//instance of socket.io
const io = socketio(server);

io.on('connection', (socket) => {
    //Allows us access to name and room on the backend
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({
            id: socket.id,
            name,
            room
        });
        if (error) return callback(error);

        //Tells user that he has joined the room
        //.emit sending message to frontend
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        //Tells everybody else that the user has joined the room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`});

        socket.join(user.room);
    })
    //.on receiving message from front end
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message});

        // callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`})
        }
        console.log("User left!!!");
    })
})

//calling as middleware
app.use(router);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));