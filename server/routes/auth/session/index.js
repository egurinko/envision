const router = require("express").Router();
const sessionController = require("../../../controller/auth/session");

// Check if the privided username and password is matched with username and hashedPW in db
module.exports = services => {
  router.post("/", (req, res) => sessionController.create(req, res, services));

  return router;
};
