const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

// LOGGING SETTINGs
app.use(
  morgan(
    ":remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length] :response-time ms"
  )
);

// URL Encode for POST requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Extract JSON data from POST requests
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/../dist/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../dist/index.html"));
});

module.exports = app;
