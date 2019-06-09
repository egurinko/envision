const router = require("express").Router();

const envsRouter = require("./envs");
const comfortRouter = require("./comfort");
const trainingRouter = require("./training");
const authRouter = require("./auth");
const contributionRouter = require("./contributions");

module.exports = function(services) {
  // Execute /api
  router.use("/envs", envsRouter(services));
  router.use("/comfort", comfortRouter(services));
  router.use("/training-data", trainingRouter(services));
  router.use("/contributions", contributionRouter(services));

  router.use("/auth", authRouter(services));

  return router;
};
