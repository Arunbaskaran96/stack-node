const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Auth = require("../Controllers/middleware/verify");
const User = require("../controllers/middleware/userid");

const questions = require("../Models/QuestionModel");

router.post("/question", Auth, User, (req, res) => {
  const id = req.userUniqueId ? req.userUniqueId : null;

  const addQuestion = new questions({
    askedby: id,
    question: {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
    },
  });

  addQuestion
    .save()
    .then((result) => {
      res.status(200).json({ message: "added" });
    })
    .catch((err) => {
      res.status(500).json({ message: "somethingwent wrong" });
    });
});

router.get("/questions", Auth, (req, res) => {
  questions
    .find()
    .populate("askedby")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no questions" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    });
});

router.get("/question/:id", Auth, (req, res) => {
  questions
    .find({ _id: req.params.id })
    .populate("askedby")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no question found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
