import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";



const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);



  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('user-connected', (connectedUsers) => {
      setUsers(connectedUsers);
    });

    socket.on('user-disconnected', (connectedUsers) => {
      setUsers(connectedUsers);
    });
  }, []);




  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      socket.emit("new-user", username);
      setShowChat(true);
    } // how to show users are online using socket.io?
  };

  useEffect(() => {
    // Listen for the 'users' event from the server
    socket.on('users', (data) => {
      setUsers(data);
    });
  }, []);



  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Welcome</h3>
          <h2>Chooce a Username</h2>
          <h2>Join a Room</h2>


          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}

      <div className="userstats">
        <h3>Connected Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Room</th>
            </tr>
            <tr>
              <td>
                {users.map((user) => (
                  <li key={user}>{user}</li>

                ))}
              </td>
              <td>
                {users.map((user) => (
                  <li key={user}>{room}</li>

                ))}
              </td>
            </tr>

          </thead>
        </table>
      </div>

    </div>
  );
}

export default App;