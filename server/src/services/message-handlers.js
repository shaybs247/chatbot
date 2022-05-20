const { createUsernameSetMessage } = require('./bot');
const { CHANNEL_NAME } = require('./constants');

const ioMessageHandler = (io, socket) => {
  socket.on(CHANNEL_NAME, (message) => {
    console.log(
      '🚀 ~ file: message-handlers.js ~ line 6 ~ socket.on ~ message',
      message
    );
    if (message.type === 'set-username') {
      sendPrivateMessage({
        io,
        socket,
        text: createUsernameSetMessage(message.username)
      });
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

module.exports = {
  ioMessageHandler,
  sendPrivateMessage,
  broadcastMessage
};
