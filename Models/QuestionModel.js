const mongoose = require("mongoose");

const questionmodel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  votes: {
    type: Number,
    required: true,
    default: 0,
  },
  answers: {
    type: Number,
    required: true,
    default: 0,
  },
});

const questionSchema = mongoose.Schema({
  askedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  question: questionmodel,
});

module.exports = mongoose.model("question", questionSchema);
