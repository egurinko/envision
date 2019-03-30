const router = require("express").Router();

const envsRouter = require("./envs");

module.exports = function(services) {
  // Execute /api
  router.use("/envs", envsRouter(services));

  return router;
};
