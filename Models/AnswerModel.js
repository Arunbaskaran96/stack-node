const mongoose = require("mongoose");

// const Answermodels = mongoose.Schema(
//   {
//     _id: mongoose.Schema.Types.ObjectId,
//   },
//   {
//     result: {
//       type: String,
//       required: true,
//     },
//   }
// );

const answerSchema = mongoose.Schema({
  questionid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  answeredby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
