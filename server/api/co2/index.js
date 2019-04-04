const router = require("express").Router();
const convertTime = require("../../module/convertTime");

module.exports = services => {
  router.get("/", async (req, res) => {
    const data = await services.co2.list();
    const newData = data.map(co2 => {
      return {
        _id: co2._id,
        co2: { unit: co2.co2.unit, value: co2.co2.value },
        timestamp: convertTime(co2.timestamp)
      };
    });
    res.status(200).send(newData);
  });

  router.post("/", (req, res) => {
    services.co2.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
