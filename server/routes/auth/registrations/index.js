const router = require("express").Router();
const registrationController = require("../../../controller/auth/registrations");
const verifyToken = require("../../../middleware/verifyToken");

module.exports = services => {
  router.post("/", verifyToken, (req, res) =>
    registrationController.create(req, res, services)
  );

  return router;
};
