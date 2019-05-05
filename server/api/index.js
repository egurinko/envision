const router = require("express").Router();

const envsRouter = require("./envs");
const comfortRouter = require("./comfort");

module.exports = function(services) {
  // Execute /api
  router.use("/envs", envsRouter(services));
  router.use("/comfort", comfortRouter(services));

  return router;
};
