// Import client version of Socketio
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

import './App.css';

const App=()=>{
  // We need a place to put messages when we gets synced from the server
  const [ messages, setMessages ] = useState([]);
  // Create a place to store the input value from form
  const [ messageInput, setMessageInput ] = useState("");
  // Store client socket in state to be able to trigger events throughout our component
  const [ socket, setSocket ] = useState(null);

  // On mount, create once instance of client Socketio
  useEffect(()=>{
    // Initialize client socket, keep in mind we do not need to specify our backend url 
    // http://localhost:8080 because we are using a proxy in the frontend package.json
    const clientSocket = io();
    // Client side listening for an event to keep clients synced
    clientSocket.on("sync_msgs_to_client", (msgArr)=>{
      setMessages(msgArr);
    });
    // Store new instance in state to access elsewhere
    setSocket(clientSocket);
  },[]);

  // Handle message form input
  const handleMessageInput=(e)=>{
    setMessageInput(e.target.value);
  }

  const handlePostMessage=(e)=>{
    e.preventDefault();
    // Using the client socket instance send the current message to the backend server
    socket.emit("post_message", messageInput);
    // Clear the current message
    setMessageInput("");
  }

  let msgElArr = messages.map((msg)=>{
    return <li>{msg}</li>
  })

  return (
    <div>
      <form onSubmit={handlePostMessage}>
        <input 
          placeholder="Please enter a message..."
          value={messageInput}
          onChange={handleMessageInput}
        />
        <button>Post</button>
      </form>
      <h3>Show all message</h3>
      <ul>
        { msgElArr }
      </ul>
    </div>
  );
}

export default App;
