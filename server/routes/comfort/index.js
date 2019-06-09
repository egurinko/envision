const router = require("express").Router();

module.exports = services => {
  router.get("/", async (req, res) => {
    const timespan = req.query.timespan ? req.query.timespan : null;
    const data = await services.comfort.list(timespan);
    res.status(200).send(data);
  });

  // router.post("/", (req, res) => {
  //   services.comfort.create(req.body);
  //   res.sendStatus(200);
  // });

  return router;
};
