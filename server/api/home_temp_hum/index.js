const router = require("express").Router();

module.exports = services => {
  router.get("/", async (req, res) => {
    const data = await services.homeTempHum.list();
    res.status(200).send(data);
  });

  router.post("/", (req, res) => {
    services.homeTempHum.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
