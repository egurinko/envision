const router = require("express").Router();

module.exports = services => {
  router.get("", (req, res) => {
    res.sendStatus(200);
  });

  router.post("", (req, res) => {
    const data = [];
    for (let key in req.body) {
      const obj = {};
      obj[key] = req.body[key];
      data.push(obj);
    }
    console.log("REQUEST DATA", typeof data, data);
    services.envs.create(data);
    res.sendStatus(200);
  });

  return router;
};
