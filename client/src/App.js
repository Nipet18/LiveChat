import "./App.css";
import io from "socket.io-client";
import React, { useState } from 'react';
import Chat from "./Chat";
import Stats from './Stats';

//The URL were we a running socket.io
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">

      <div>
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!showChat ? (
        <div className="joinChatContainer">
          <h1>Welcome</h1>

          <p>Create A Username</p>
          <p>Join Any Room You Want!</p>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }} />

          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }} />

          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;