let jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.API_SECRET;

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ auth: false, errorMessage: "You must login." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        auth: false,
        errorMessage: "Token is not valid."
      });
    }

    req.decoded = decoded;
    next();
  });
};
