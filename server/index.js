const express = require("express");
const path = require("path");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, "/../dist/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../dist/index.html"));
});

app.listen(port);

console.log("HELLO EXPRESS! Listening on PORT ", port);
