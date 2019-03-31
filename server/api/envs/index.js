const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    console.log("Hello World");
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    const data = req.body;
    console.log("REQUEST DATA", data);
    console.log("REQUEST TYPE", typeof data);
    services.envs(data);
    res.sendStatus(200);
  });

  return router;
};
