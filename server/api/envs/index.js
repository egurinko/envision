const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    const data = req.body;
    console.log("REQUEST DATA", typeof data, data);
    console.log(
      "PARSED REQUEST DATA",
      typeof JSON.parse(data),
      JSON.parse(data)
    );
    services.envs.create(data);
    res.sendStatus(200);
  });

  return router;
};
