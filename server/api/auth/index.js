const router = require("express").Router();

const registrationRouter = require("./registrations");
const loginRouter = require("./login");

module.exports = function(services) {
  // Execute /api/auth
  router.use("/registrations", registrationRouter(services));
  router.use("/login", loginRouter(services));

  return router;
};