const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const secret = config.express.apiSecret;

exports.list = async (req, res, services) => {
  const data = await services.user.list();
  res.status(200).send(data);
};

exports.create = async (req, res, services) => {
  const hashedPW = bcrypt.hashSync(req.body.password, 8);

  await services.user
    .create({
      username: req.body.username,
      password: hashedPW
    })
    .then(data => {
      const token = jwt.sign({ id: data._id }, secret, {
        expiresIn: 86400 * 30 // expires in 1 month
      });
      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
