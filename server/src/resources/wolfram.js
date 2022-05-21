const fetch = require('node-fetch');

const getWolframAnswer = async (question) => {
  const res = await fetch(
    `https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(
      question
    )}&appid=${process.env.WOLFRAM_APPID}`
  );
  return await res.text();
};

module.exports = {
  getWolframAnswer
};
