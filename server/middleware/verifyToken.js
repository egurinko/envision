let jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.API_SECRET;

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.json({
        auth: false,
        message: "Token is not valid"
      });
    }

    req.decoded = decoded;
    next();
  });
};
