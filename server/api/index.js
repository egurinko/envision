const router = require("express").Router();

const envsRouter = require("./envs");
const co2Router = require("./co2");

module.exports = function(services) {
  // Execute /api
  router.use("/envs", envsRouter(services));
  router.use("/co2", co2Router(services));

  return router;
};
