// Import server version of Socketio
import { Server } from "socket.io";

// Initializing of Socketio server
const io = new Server();

// Array of messages that will be shared between clients
let messages = ["default message"];

// Listening Event for all connections from clients
io.on("connection", (socket) => { // Callback function that triggers when a connection is made

    // On connection emit a message immediately to sync new client, sending the message array above
    io.emit("sync_msgs_to_client", messages);

    // Listening event for the specific client that connected
    socket.on("post_message", (msg)=>{

        // When a client triggers this event, push the accompanying message to messages array
        messages.push(msg);

        // Emit an event to sync messages with all connected clients
        io.emit("sync_msgs_to_client", messages);

    })
  
});

// Start Socketio server
io.listen(process.env.PORT || 8080);