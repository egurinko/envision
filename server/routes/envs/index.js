const router = require("express").Router();
const envsController = require("../../controller/envs/index");

module.exports = services => {
  router.get("/", async (req, res) => envsController.list(req, res, services));

  router.post("/", async (req, res) =>
    envsController.create(req, res, services)
  );

  return router;
};
