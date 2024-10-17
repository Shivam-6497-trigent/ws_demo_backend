const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS package

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["https://websockets-sess-demo.netlify.app","http://localhost:5173"], 
        methods: ["GET", "POST"] // Allowed methods
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('message', (data) => {
        console.log(`Message received: ${data}`);
        io.emit('message', data);
    });
});

const PORT = 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
