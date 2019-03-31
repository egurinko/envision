const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    console.log("Hello World");
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    let data = req.body;
    console.log("REQUEST DATA", data);
    for (let i in data) {
      console.log("EACH DATA INDEX", i);
      console.log("EACH DATA VALUE", data[i]);
    }
    services.envs.create(data);
    res.sendStatus(200);
  });

  return router;
};
