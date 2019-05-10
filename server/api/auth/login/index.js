const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secret = process.env.API_SECRET;

// Check if the privided username and password is matched with username and hashedPW in db
module.exports = services => {
  console.log("HELLO LOGIN API");
  router.post("/", async (req, res) => {
    await services.user
      .get({ username: req.body.username })
      .then(data => {
        if (!data) {
          res.status(404).send("No user found.");
          return;
        }

        const isPWValid = bcrypt.compareSync(req.body.password, data.password);
        if (!isPWValid) {
          res.status(401).send({ auth: false, token: null });
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
  });

  return router;
};
