const router = require("express").Router();

module.exports = services => {
  router.get("/", (req, res) => {
    const data = services.envs.list();
    console.log("HELLO", data);
    res.status(200).json(data.data);
  });

  router.post("/", (req, res) => {
    services.envs.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
