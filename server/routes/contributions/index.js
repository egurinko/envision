const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");
const contributionController = require("../../controller/contributions/index");

module.exports = services => {
  router.get("/", (req, res) =>
    contributionController.list(req, res, services)
  );

  router.post("/", verifyToken, (req, res) =>
    contributionController.create(req, res, services)
  );

  return router;
};
