import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import ActiveUsers from "../ActiveUsers/ActiveUsers";

let socket;

//location comes from 'router'
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const ENDPOINT =
    process.env.NODE_ENV === "production"
      ? "https://peachtree-chats-15c4ca881dfb.herokuapp.com/"
      : "http://localhost:5001";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, ({ error }) => {
      alert("Ran into an issue. Try to refresh");
    });

    //Used for unmounting
    return () => {
      socket.emit("disconnect");
      //turns off socket instance
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", (roomData) => {
      let users = roomData.users.map((user) => user.name);
      setUsers(users);
    });
  }, [users]);

  const sendMessage = (event) => {
    //When you key press or button click an entire page refresh happens
    //event.preventDefault keeps this full page refresh from happening
    event.preventDefault();

    if (message) socket.emit("sendMessage", message, () => setMessage(""));
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <ActiveUsers users={users} />
    </div>
  );
};

export default Chat;
