const mongoose = require("mongoose");

const Usermodel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  city: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", Usermodel);
