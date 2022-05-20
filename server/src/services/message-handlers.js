const { CHANNEL_NAME } = require('./constants');

const ioMessageHandler = (io, socket) => {
  socket.on(CHANNEL_NAME, (message) => {
    console.log(
      '🚀 ~ file: message-handlers.js ~ line 5 ~ socket.on ~ message',
      message
    );
    if (message.text.search(new RegExp('Elon', 'i')) !== -1) {
      sendPrivateMessage({ io, socket, text: 'message from elon' });
    } else {
      broadcastMessage({ io, socket, message });
    }
  });
};

const sendPrivateMessage = ({ io, socket, text }) => {
  io.to(socket.id).emit(CHANNEL_NAME, {
    username: 'Elon',
    timeStamp: new Date().toLocaleTimeString('it-IT'),
    text
  });
};

const broadcastMessage = ({ io, socket, message }) => {
  io.emit(CHANNEL_NAME, {
    ...message,
    sessionId: socket.id,
    text: 'broadcast'
  });
};

module.exports = {
  ioMessageHandler,
  sendPrivateMessage,
  broadcastMessage
};
