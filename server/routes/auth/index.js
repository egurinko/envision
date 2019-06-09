const router = require("express").Router();

const registrationRouter = require("./registrations");
const sessionRouter = require("./session");

module.exports = function(services) {
  // Execute /api/auth
  router.use("/registrations", registrationRouter(services));
  router.use("/login", sessionRouter(services));

  return router;
};
