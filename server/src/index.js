const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { WELCOME_MESSAGE } = require('./services/bot');
const {
  ioMessageHandler,
  sendPrivateMessage
} = require('./services/message-handlers');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.json({
    message:
      'Welcome to Elon\'s chat server. Please send all your requests to the "elon/chat" channel'
  });
});

io.on('connection', (socket) => {
  sendPrivateMessage({ io, socket, text: WELCOME_MESSAGE });

  ioMessageHandler(io, socket);
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log('Server listens on port:', port);
  console.log(`Server runs on: http://localhost:${port}`);
});
