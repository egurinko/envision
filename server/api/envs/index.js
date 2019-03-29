const router = require("express").Router();

router.get("", (req, res) => {
  console.log("Hello World");
  res.sendStatus(200);
});

router.post("", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
