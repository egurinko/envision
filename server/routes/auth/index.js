const router = require("express").Router();

const userRouter = require("./users");
const sessionRouter = require("./session");

module.exports = function(services) {
  // Execute /api/auth
  router.use("/users", userRouter(services));
  router.use("/login", sessionRouter(services));

  return router;
};
