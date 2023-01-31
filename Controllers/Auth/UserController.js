const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const users = require("../../Models/UserModel");
const bcrypt = require("bcrypt");
const { populate } = require("../../Models/UserModel");
const Auth = require("../middleware/verify");
const User = require("../middleware/userid");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const secret = "Arun";

//creating a user
// router.post("/user", (req, res) => {
//   const newUser = new users({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     address: req.body.address,
//     phone: req.body.phone,
//     // _id: req.body._id,
//   });
//   newUser
//     .save()
//     .then((result) => {
//       if (result) {
//         res.status(200).json({ message: "user created" });
//       } else {
//         res.status(400).json({ message: "something went wrong" });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "something went wrong" });
//       console.log(error);
//     });
// });

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const user = new users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      _id: new mongoose.Types.ObjectId(),
      city: req.body.city,
      about: req.body.about,
    });

    await user.save();
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
    console.log(error);
  }
});

//get all the users

router.get("/users", (req, res) => {
  users
    .find()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no users" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    });
});

//to get single user

router.get("/user/:id", (req, res) => {
  users
    .findOne({ _id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "no found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "something went wrong" });
    });
});

router.get("/user", Auth, User, (req, res) => {
  const email = req.Token.email;
  users.findOne({ email: email }).then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

//forgot password

router.post("/forgot-password", async (req, res) => {
  try {
    const olduser = await users.findOne({ email: req.body.email });
    console.log(olduser);
    if (!olduser) {
      res.status(200).json({ message: "User Not Exist" });
    }

    const Secret = secret + olduser.password;

    const token = jwt.sign({ email: olduser.email, id: olduser._id }, Secret, {
      expiresIn: "50m",
    });

    const link = `http://localhost:8000/reset-password/${olduser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bbaa@gmail.com",
        pass: "yourpassword",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: olduser.email,
      subject: "For password change",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/reset-password/:id/:token", async (req, res) => {
  // const { id, token } = req.params;
  const olduser = await users.findOne({ _id: req.params.id });
  if (!olduser) {
    res.status(400).json({ message: "user not found" });
  }
  const Secret = secret + olduser.password;
  try {
    const verify = jwt.verify(req.body.token, Secret);

    res.render("index", { email: verify.email });
  } catch (error) {
    res.send("not verifird");
    console.log(error);
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  // const { id, token } = req.params;
  const olduser = await users.findOne({ _id: req.params.id });
  if (!olduser) {
    res.status(400).json({ message: "user not found" });
  }
  const Secret = secret + olduser.password;
  try {
    const verify = jwt.verify(req.body.token, Secret);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    await users.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          password: hash,
        },
      }
    );

    res.json({ message: "password changed" });
  } catch (error) {
    res.send("not verifird");
    console.log(error);
  }
});

module.exports = router;
