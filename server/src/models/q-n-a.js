const mongoose = require('mongoose');
const MyObjectId = mongoose.Types.ObjectId;

const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, unique: true },
    answers: [MyObjectId]
  },

  { timestamps: true }
);

const Questions = mongoose.model('Questions', QuestionSchema);

const AnswersSchema = new mongoose.Schema(
  {
    question: { type: MyObjectId, ref: 'Questions' },
    answer: String
  },

  { timestamps: true }
);

const Answers = mongoose.model('Answers', AnswersSchema);

module.exports.addQuestion = async (question) => {
  try {
    const resp = await Questions.findOne(question);
    if (!resp) {
      const questionEntity = new Questions(question);
      await questionEntity.save();
      console.log(question, 'added to the db');
    }
  } catch (err) {
    console.error('cannot put on db', err);
  }
};

module.exports.addAnswer = async ({ question, answer }) => {
  try {
    const questionEntity = await Questions.find({ question });
    const answerEntity = new Answers({ question: questionEntity._id, answer });

    await answerEntity.save();
    console.log(answer, 'added to the db');
  } catch (err) {
    console.error('cannot put on db', err);
  }
};
