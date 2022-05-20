const { createUsernameSetMessage } = require('./bot');
const { addQuestion, addAnswer } = require('../models/q-n-a');
const { CHANNEL_NAME, Q_PREFIX, A_PREFIX } = require('./constants');

const ioMessageHandler = (io, socket) => {
  socket.on(CHANNEL_NAME, (message) => {
    if (message.type === 'set-username') {
      sendPrivateMessage({
        io,
        socket,
        text: createUsernameSetMessage(message.username)
      });
    } else if (message.text.startsWith(Q_PREFIX)) {
      handleQuestion(message, io, socket);
    } else if (message.text.startsWith(A_PREFIX)) {
      handleAnswer(message, io, socket);
    } else if (message.text.search(new RegExp('Elon', 'i')) !== -1) {
      sendPrivateMessage({ io, socket, text: 'message from elon' });
    } else {
      broadcastMessage({ io, socket, message });
    }
  });
};

const sendPrivateMessage = ({ io, socket, text }) => {
  io.to(socket.id).emit(CHANNEL_NAME, {
    senderId: 'bot',
    username: 'Elon',
    timeStamp: new Date().toLocaleTimeString('it-IT'),
    text
  });
};

const broadcastMessage = ({ io, socket, message }) => {
  io.emit(CHANNEL_NAME, {
    ...message,
    senderId: socket.id
  });
};

const handleAnswer = (message, io, socket) => {
  const question = message.text.slice(2).trimStart();
  addQuestion({ question });
  broadcastMessage({ io, socket, message });
};

const handleQuestion = (message, io, socket) => {
  const question = message.text.slice(2).trimStart();
  addQuestion({ question });
  broadcastMessage({ io, socket, message });
};

module.exports = {
  ioMessageHandler,
  sendPrivateMessage,
  broadcastMessage
};
