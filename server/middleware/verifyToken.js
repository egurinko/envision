let jwt = require("jsonwebtoken");
const config = require("../../config");
const secret = config.express.apiSecret;

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
