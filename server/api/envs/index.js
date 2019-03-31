const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    console.log("Hello World");
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    let data;
    for (let i in req.body) {
      data = req.body[i];
    }
    console.log("REQUEST DATA", data);
    services.envs(JSON.stringify(data));
    res.sendStatus(200);
  });

  return router;
};
