const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const answers = require("../Models/AnswerModel");
const question = require("../Models/QuestionModel");

const Auth = require("../Controllers/middleware/verify");
const UserId = require("../Controllers/middleware/userid");

router.post("/answer", Auth, UserId, (req, res) => {
  const id = req.userUniqueId ? req.userUniqueId : null;

  const product_id = req.body._id ? req.body._id : null;

  question
    .find({ _id: product_id })
    .exec()
    .then((response) => {
      const newans = new answers({
        questionid: product_id,
        answeredby: id,
        answer: req.body.result,
      });

      newans.save().then((result) => {
        res.json({ message: "working" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/answer/:_id", (req, res) => {
  const product_id = req.params._id ? req.params._id : null;

  answers
    .find({ questionid: product_id })
    .populate("answeredby")
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "no answers found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
