const router = require("express").Router();

module.exports = services => {
  router.get("/", async (req, res) => {
    const data = await services.co2.list();
    res.status(200).send(data.data);
  });

  router.post("/", (req, res) => {
    services.co2.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
