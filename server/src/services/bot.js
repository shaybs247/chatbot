const WELCOME_MESSAGE = `Hey Stranger,
Nice to meet you! 👻
Welcome to **Elon's chat.**
This is the place for you to ask me or other users all kinds of questions.
I would like to introduce to you some of our guidelines but first I would like to know,\n**What's your name**?`;

const GUIDELINES_MESSAGE = `Before we start I would like to introduce some of our guidelines:
**1.** Please be polite to each other 🤗.
**2.** ❓ If you want to ask a question pls prefix is with **~~"q: "~~**.
**3.** ❗ If you want to answer to someone's question pls prefix you answer with: **~~"a: "~~**
**4.** 🤠 If you want to ask me directly, don't be afraid 😉, just start your question with **~~Elon~~**.
`;

const YOU_CAN_ASK_ME = `There is no previous answers to your question 🥺.
But no worries you can try asking me!`;

const createUsernameSetMessage = (
  username
) => `Wow ~~**${username}**~~ this is So much fun you here!
${GUIDELINES_MESSAGE}`;

const createAnswersMessage = (username, answers) => `Hey **${username}**,
Hooray! 🎊 🎊
I found some previous answers to you questions:
${answers.map((ans, i) => `**${i + 1}.** ${ans}`).join('\n')}
`;

const createAnswer = (answer) => `This is what I found online:
**~~${answer}~~**`;

module.exports = {
  GUIDELINES_MESSAGE,
  WELCOME_MESSAGE,
  YOU_CAN_ASK_ME,
  createUsernameSetMessage,
  createAnswersMessage,
  createAnswer
};
