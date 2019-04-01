const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    console.log("DATA");
    const data = services.envs.list();
    res.status(200).json(data);
  });

  router.post("", (req, res) => {
    services.envs.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
