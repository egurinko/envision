const router = require("express").Router();

module.exports = services => {
  router.get("/", async (req, res) => {
    const data = await services.envs.list();
    // const newData = data.map(env => {
    //   return {
    //     _id: env._id,
    //     pressure: { unit: env.pressure.unit, value: env.pressure.value },
    //     temp: { unit: env.temp.unit, value: env.temp.value },
    //     hum: { unit: env.hum.unit, value: env.hum.value },
    //     timestamp: convertTime(env.timestamp)
    //   };
    // });
    res.status(200).send(data);
  });

  router.post("/", (req, res) => {
    services.envs.create(req.body);
    res.sendStatus(200);
  });

  return router;
};
