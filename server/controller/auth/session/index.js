const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../../../config");
const secret = config.express.apiSecret;

exports.create = async (req, res, services) => {
  await services.user
    .get({ username: req.body.username })
    .then(data => {
      if (!data) {
        res.status(404).send({ errorMessage: "No user found." });
        return;
      }

      const isPWValid = bcrypt.compareSync(req.body.password, data.password);
      if (!isPWValid) {
        res.status(401).send({
          auth: false,
          token: null,
          errorMessage: "Password is invalid."
        });
        return;
      }
      const token = jwt.sign({ id: res._id }, secret, {
        expiresIn: 86400 * 30 // expires in 1 month
      });
      res
        .status(200)
        .send({ auth: true, token: token, username: data.username });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
