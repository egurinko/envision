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
    let temp = {};
    for (let key in data) {
      temp[key] = data[key];
    }
    console.log("DATA", typeof data, temp);
    services.envs.create(temp);
    res.sendStatus(200);
  });

  return router;
};
