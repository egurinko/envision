const router = require("express").Router();

module.exports = services => {
  router.get("/", async (req, res) => {
    console.log("TIMESPAN BACKEND: ", req.query.timespan);
    const data = await services.envs.list(req.params.timespan);
    res.status(200).send(data);
  });

  router.post("/", (req, res) => {
    services.envs.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
