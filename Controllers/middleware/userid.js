const user = require("../../Models/UserModel");

module.exports = (req, res, next) => {
  // let email = req.Token.email ? req.Token.email : null;
  // console.log(email);
  // if (email === "") {
  //   res.message = "ALAS: TOKEN DOESNT HAVE ANY DETAILS";
  //   return res.json({
  //     success: false,
  //     message: "ALAS: TOKEN DOESNT HAVE ANY DETAILS",
  //     status: 401,
  //   });
  // } else {
  //   user
  //     .findOne({ email: email })
  //     .exec()
  //     .then((result) => {
  //       // console.log(result);
  //       req.userUniqueId = result._id;
  //       next();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //req.userUniqueId = decodedToken
  // }

  if (req.Token.email) {
    user
      .findOne({ email: req.Token.email })
      // .exec()
      .then((result) => {
        req.userUniqueId = result._id;
        next();
      });
  } else {
    res.json({ message: "no user" });
  }
};
