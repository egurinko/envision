const router = require("express").Router();
const comfortController = require("../../controller/comfort/index");

module.exports = services => {
  router.get("/", async (req, res) =>
    comfortController.list(req, res, services)
  );

  return router;
};
