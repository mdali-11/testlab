const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  question: [
    {
      s_n: {
        type: Number,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          a: {
            type: String,
          },
          b: {
            type: String,
          },
          c: {
            type: String,
          },
          d: {
            type: String,
          },
        },
      ],

      rightAnswer: {
        type: String,
        required: true,
      },
      userAnswer: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);
module.exports = Exam;
