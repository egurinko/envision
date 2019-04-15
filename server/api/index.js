const router = require("express").Router();

const envsRouter = require("./envs");
const co2Router = require("./co2");
const comfortRouter = require("./comfort");
const homeTempHumRouter = require("./home_temp_hum");

module.exports = function(services) {
  // Execute /api
  router.use("/envs", envsRouter(services));
  router.use("/co2", co2Router(services));
  router.use("/comfort", comfortRouter(services));
  router.use("/home_temp_hum", homeTempHumRouter(services));

  return router;
};
