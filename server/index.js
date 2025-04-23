const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5001;

const router = require("./router.js");

const app = express();
const server = http.createServer(app);
//instance of socket.io
const io = socketio(server, {
  cors: {
    origin: "https://peachtree-chats.herokuapp.com",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

//calling as middleware
app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  //Allows us access to name and room on the backend
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
    });
    if (error) return callback(error);

    //Tells user that he/she has joined the room
    //.emit sending message to frontend
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    //Tells everybody else that the user has joined the room
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
  //.on receiving message from front end
  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
    }
    console.log("User left!!!");
  });
});
