const router = require("express").Router();
const envsRouter = require("./envs");

// Execute /api
router.use("/envs", envsRouter);

module.exports = router;
