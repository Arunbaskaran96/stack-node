const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:webcode@cluster0.xkhfgqj.mongodb.net/webcode?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("CONNECTED");
    }
  }
);
