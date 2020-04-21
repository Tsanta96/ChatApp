const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
//instance of socket.io
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("We have a new connection!!!");

    //Allows us access to name and room on the backend
    socket.on('join', ({name, room}, callback) => {
        console.log(name);
        console.log(room);

        //Error handling
        let error = true;
        if (error) {
            callback({ error: 'Somthin aint raght'});
        }
    })

    socket.on('disconnect', () => {
        console.log("User left!!!");
    })
})

//calling as middleware
app.use(router);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));