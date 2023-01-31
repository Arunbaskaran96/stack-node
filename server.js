const express = require("express");
const bodyparser = require("body-parser");

//initializing express
const server = express();

const app = require("./app");

server.use("/", app);

//connecting a database
require("./Connection/Configuration");

server.listen(8000);
