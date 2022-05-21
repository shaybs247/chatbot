const {
  createUsernameSetMessage,
  createAnswer,
  createAnswersMessage,
  YOU_CAN_ASK_ME
} = require('./bot');
const { addQuestion, addAnswer, getAnswers } = require('../models/q-n-a');
const { CHANNEL_NAME, Q_PREFIX, A_PREFIX } = require('./constants');
const { getWolframAnswer } = require('../resources/wolfram');

const elonRegex = new RegExp('Elon', 'i');

let currentQuestion = '';

const ioMessageHandler = (io, socket) => {
  socket.on(CHANNEL_NAME, (message) => {
    if (message.type === 'set-username') {
      sendElonMessage({
        io,
        socket,
        text: createUsernameSetMessage(message.username)
      });
    } else if (message.text.startsWith(Q_PREFIX)) {
      handleQuestion({ message, io, socket });
    } else if (message.text.startsWith(A_PREFIX)) {
      handleAnswer({ message, io, socket });
    } else if (message.text.search(elonRegex) !== -1) {
      handleElonQuestion({ message, io, socket });
    } else {
      broadcastMessage({ io, socket, message });
    }
  });
};

const sendPrivateMessage = ({ io, socket, message }) => {
  io.to(socket.id).emit(CHANNEL_NAME, {
    senderId: socket.id,
    ...message
  });
};

const broadcastMessage = ({ io, socket, message }) => {
  io.emit(CHANNEL_NAME, {
    ...message,
    senderId: socket.id
  });
};

const handleAnswer = ({ io, socket, message }) => {
  broadcastMessage({ io, socket, message });

  const answer = message.text.slice(2).trimStart();
  if (!answer) {
    return;
  }

  addAnswer({ question: currentQuestion, answer });
};

const handleQuestion = async ({ io, socket, message }) => {
  broadcastMessage({ io, socket, message });

  const question = message.text.slice(2).trimStart();
  if (!question) {
    sendElonMessage({ io, socket, text: 'your question was empty, try again' });
  }
  currentQuestion = question;

  const answers = await getAnswers({ question });
  if (answers.length) {
    sendElonMessage({
      io,
      socket,
      text: createAnswersMessage(message.username, answers)
    });
  } else {
    console.log(
      '🚀 ~ file: message-handlers.js ~ line 77 ~ handleQuestion ~ YOU_CAN_ASK_ME',
      YOU_CAN_ASK_ME
    );
    sendElonMessage({
      io,
      socket,
      text: YOU_CAN_ASK_ME
    });
  }

  addQuestion({ question });
};

const sendElonMessage = ({ io, socket, text }) => {
  sendPrivateMessage({
    io,
    socket,
    message: {
      senderId: 'bot',
      username: 'Elon',
      timeStamp: new Date().toLocaleTimeString('it-IT'),
      text
    }
  });
};

const handleElonQuestion = async ({ io, socket, message }) => {
  sendPrivateMessage({ io, socket, message });
  const question = message.text
    .replace(elonRegex, '')
    .replace(/[^\w\s]/gi, '')
    .trimStart();
  console.log(
    '🚀 ~ file: message-handlers.js ~ line 95 ~ handleElonQuestion ~ question',
    question
  );

  const answer = await getWolframAnswer(question);

  sendElonMessage({ io, socket, text: createAnswer(answer) });
};

module.exports = {
  ioMessageHandler,
  sendPrivateMessage,
  broadcastMessage,
  sendElonMessage
};
