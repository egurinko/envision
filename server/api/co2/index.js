const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    const data = [];
    data.push(req.body);

    services.envs.create(data);
    res.sendStatus(200);
  });

  return router;
};
