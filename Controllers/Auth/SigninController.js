const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Arun";
// const Auth = require("../middleware/Verify");
// const User = require("../middleware/userid");

const Users = require("../../Models/UserModel");

router.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
      const tokendata = {
        email: user.email,
        password: user.password,
        _id: user._id,
        name: user.name,
      };
      const token = jwt.sign(tokendata, secret, { expiresIn: "50m" });
      res.json({ message: "user found", token });
    } else {
      res.status(400).json({ message: "user/password incorrect" });
    }
  } else {
    res.status(400).json({ message: "user not found" });
  }
});

router.get("/user", (req, res) => {
  const email = req.Token.email;
  Users.findOne({ email: email }).then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

module.exports = router;
