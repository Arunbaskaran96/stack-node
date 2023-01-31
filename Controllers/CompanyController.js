const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const comapnies = require("../Models/CompanyModels");

router.post("/company", (req, res) => {
  const newone = new comapnies({
    name: req.body.name,
    city: req.body.city,
    des: req.body.des,
  });
  newone
    .save()
    .then((result) => {
      if (result) {
        res.json({ message: "created" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

router.get("/companies", (req, res) => {
  comapnies
    .find()
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(200).json({ message: "no companies found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});
module.exports = router;
