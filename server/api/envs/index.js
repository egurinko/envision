const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    console.log("Hello World");
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    const body = req.body;
    let data;
    for (let key in body) {
      data = body[key];
      console.log("EACH", data);
    }
    console.log("REQUEST DATA", data, body);
    services.envs.create(data);
    res.sendStatus(200);
  });

  return router;
};
