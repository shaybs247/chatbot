const mongoose = require('mongoose');

const QnASchema = new mongoose.Schema(
  {
    question: String
  },

  { timestamps: true }
);

const QnA = mongoose.model('QnA', QnASchema);

module.exports = QnA;

module.exports.addToDb = (qna) => {
  new QnA(qna).save(function (err, qna) {
    if (err) return console.error('cannot put on db', err);
    if (qna) return console.log(qna, 'added to the db');
  });
};
