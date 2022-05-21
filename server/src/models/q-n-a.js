const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, unique: true },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answers' }]
  },

  { timestamps: true }
);

const Questions = mongoose.model('Questions', QuestionSchema);

const AnswersSchema = new mongoose.Schema(
  {
    answer: String
  },

  { timestamps: true }
);

const Answers = mongoose.model('Answers', AnswersSchema);

module.exports.addQuestion = async ({ question }) => {
  try {
    const normalizeQuestion = question.toLowerCase();

    const resp = await Questions.findOne({ question: normalizeQuestion });
    if (!resp) {
      const questionEntity = new Questions({ question: normalizeQuestion });
      await questionEntity.save();

      console.log(question, 'added to the db');
    } else {
      console.log(question, 'already exists');
    }
  } catch (err) {
    console.error('cannot put on db', err);
  }
};

module.exports.addAnswer = async ({ question, answer }) => {
  try {
    if (!question) {
      console.log(answer, 'will not append, no question was asked');
      return;
    }

    const normalizeQuestion = question.toLowerCase();

    const answerEntity = new Answers({ answer });
    await answerEntity.save();

    const questionEntity = await Questions.findOne({
      question: normalizeQuestion
    });

    questionEntity.answers.push(answerEntity._id);
    await questionEntity.save();
    console.log(answer, 'added to the db');
  } catch (err) {
    console.error('cannot put on db', err);
  }
};

module.exports.getAnswers = async ({ question }) => {
  try {
    const questionEntity = await Questions.findOne({
      question: question.toLowerCase()
    }).populate('answers');

    if (questionEntity === null) {
      return [];
    }

    return questionEntity.answers.map((ansSchema) => ansSchema.answer);
  } catch (err) {
    console.error('cannot put on db', err);
  }
};
