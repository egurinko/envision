const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");
const trainingController = require("../../controller/training/index");

module.exports = services => {
  router.get("/", (req, res) => trainingController.list(req, res, services));

  router.post("/", verifyToken, (req, res) =>
    trainingController.create(req, res, services)
  );

  return router;
};
