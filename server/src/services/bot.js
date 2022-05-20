const WELCOME_MESSAGE = `Hey Stranger,
Nice to meet you! 👻
Welcome to **Elon's chat.**
This is the place for you to ask me or other users all kinds of questions.
I would like to introduce to you some of our guidelines but first I would like to know **what's your name**?
`;

const GUIDELINES_MESSAGE = `Before we start I would like to introduce some of our guidelines:
1. Please be polite to each other 🤗
2. Questions will be asked with ? in the end ❓
3. If you want to answer to someone's question please use the following format:
   Answer to #<question-no.>: Tel Aviv's previous name was Ahuzat Bayit.
`;

const createUsernameSetMessage = (
  username
) => `Wow ~~**${username}**~~ this is So much fun you here!
You can choose the type of message you would like to send over the channel or you can send a message to me by referring to my name.
which is **Elon** of course 🤠
`;

module.exports = {
  GUIDELINES_MESSAGE,
  WELCOME_MESSAGE,
  createUsernameSetMessage
};
