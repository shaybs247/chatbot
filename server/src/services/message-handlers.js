const { CHANNEL_NAME } = require('./constants');

const ioMessageHandler = (io, socket) => {
  socket.on(CHANNEL_NAME, (msg) => {
    if (msg.text.search(new RegExp('Elon', 'i')) !== -1) {
      io.to(socket.id).emit(CHANNEL_NAME, { ...msg, text: 'message to elon' });
    } else {
      io.emit(CHANNEL_NAME, { ...msg, text: 'broadcast' });
    }
  });
};

module.exports = {
  ioMessageHandler
};
