const dotenv = require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { ServerApiVersion } = require('mongodb');

const credentials = './cert/X509-cert-7480899816366233205.pem';

const mongoose = require('mongoose');
const { WELCOME_MESSAGE } = require('./services/bot');
const {
  ioMessageHandler,
  sendPrivateMessage
} = require('./services/message-handlers');
const { addQuestion, addAnswer } = require('./models/q-n-a');

//setup database
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URL_PROD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1
  },
  (error) => {
    if (error) {
      console.error(
        'Please make sure Mongodb is installed and running!',
        error
      );
      throw error;
    } else console.log('connected to database!');
  }
);

const db = mongoose.connection;

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
