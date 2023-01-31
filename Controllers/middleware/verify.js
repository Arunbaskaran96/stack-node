const jwt = require("jsonwebtoken");
const secret = "Arun";

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const verify = jwt.verify(req.headers.authorization, secret);
      // console.log(verify);

      if (verify) {
        req.Token = verify;
        next();
      }
    } catch (error) {
      res.status(500).json({ message: "verify Auth failed" });
      console.log(error);
    }
  } else {
    res.status(500).json({ message: "Auth failed" });
  }
};
