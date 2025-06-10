const express = require('express');
const { join } = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
   socket.on('message', (msg) => {
    io.emit('send_messages_to_all_users' , msg);
    console.log('message: ' + msg);
  });


  socket.on('typing', (msg) => {
    //send to all users without the sender
    socket.broadcast.emit('show_typing_status');
    console.log('message: ' + msg);
  });

  socket.on('stop_typing', (msg) => {
    //send to all users without the sender
    socket.broadcast.emit('stop_show_typing_status');
    console.log('message: ' + msg);
  });


});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});


