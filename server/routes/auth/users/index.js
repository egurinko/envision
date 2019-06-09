const router = require("express").Router();
const userController = require("../../../controller/auth/users");
const verifyToken = require("../../../middleware/verifyToken");

module.exports = services => {
  router.post("/", verifyToken, (req, res) =>
    userController.create(req, res, services)
  );

  return router;
};
