const express = require("express");
const app = express();
const cors = require("cors");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());
app.set("view engine", "ejs");

const UserController = require("./Controllers/Auth/UserController");
const signinController = require("./Controllers/Auth/SigninController");
const questioncontroller = require("./Controllers/QuestionController");
const answercontroller = require("./Controllers/AnswerController");
const companyController = require("./Controllers/CompanyController");
app.use("/", UserController);
app.use("/", signinController);
app.use("/", questioncontroller);
app.use("/", answercontroller);
app.use("/", companyController);

module.exports = app;
