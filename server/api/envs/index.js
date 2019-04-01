const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    console.log("Hello World");
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    const rowData = req.body;
    let data;
    for (let i in rowData) {
      data = i;
    }
    console.log("DATA", typeof data, data);
    services.envs.create(JSON.stringify(req.body));
    res.sendStatus(200);
  });

  return router;
};
