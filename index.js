const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://websockets-sess-demo.netlify.app', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    const { username, message } = data;
    io.emit('message', { username, message });  
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5001, () => {
  console.log('Listening on port 5001');
});
