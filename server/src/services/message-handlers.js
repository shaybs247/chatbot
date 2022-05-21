const { createUsernameSetMessage, createAnswersMessage } = require('./bot');
const { addQuestion, addAnswer, getAnswers } = require('../models/q-n-a');
const { CHANNEL_NAME, Q_PREFIX, A_PREFIX } = require('./constants');

let currentQuestion = '';

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
  broadcastMessage({ io, socket, message });

  const answer = message.text.slice(2).trimStart();
  addAnswer({ question: currentQuestion, answer });
};

const handleQuestion = async (message, io, socket) => {
  broadcastMessage({ io, socket, message });

  const question = message.text.slice(2).trimStart();
  currentQuestion = question;

  const answers = await getAnswers({ question });
  if (answers) {
    sendPrivateMessage({
      io,
      socket,
      text: createAnswersMessage(message.username, answers)
    });
  }

  addQuestion({ question });
};

module.exports = {
  ioMessageHandler,
  sendPrivateMessage,
  broadcastMessage
};
