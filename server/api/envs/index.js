const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    let data;
    for (let i in req.body) {
      data = i;
    }
    console.log("DATA", typeof data, data);
    services.envs.create(data);
    res.sendStatus(200);
  });

  return router;
};
