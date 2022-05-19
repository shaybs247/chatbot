const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on('connect', (socket) => {
  // Say Hi to all connected clients
  io.emit('broadcast', '[Server]: Welcome stranger!');

  socket.on('message', (msg) => {
    // console.log(`message received from user: ${msg.from}`);
    // console.log(`message received content: ${msg.content}`);
    io.emit('message', msg);
  });

  // Say Bye to all connected clients
  socket.on('disconnect', function () {
    io.emit('broadcast', '[Server]: Bye, bye, stranger!');
  });
});

httpServer.listen(3000);
