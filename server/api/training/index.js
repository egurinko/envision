const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");

module.exports = services => {
  router.get("/", async (req, res) => {
    const timespan = req.query.timespan ? req.query.timespan : null;
    const data = await services.envs.list(timespan);
    res.status(200).send(data);
  });

  router.post("/", verifyToken, (req, res) => {
    services.trainingData
      .create(req.body)
      .then(res => {
        res.status(200);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  });

  return router;
};
