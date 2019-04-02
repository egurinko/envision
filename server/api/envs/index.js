const router = require("express").Router();

module.exports = services => {
  router.get("/", async (req, res) => {
    const data = await services.envs.list();
    res.status(200).json(data.data);
  });

  router.post("/", (req, res) => {
    services.envs.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
