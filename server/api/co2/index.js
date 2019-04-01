const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    services.envs.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
