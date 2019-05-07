const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secret = process.env.API_SECRET;

// Create a new user and token
module.exports = services => {
  router.post("/", async (req, res) => {
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
  });

  return router;
};
