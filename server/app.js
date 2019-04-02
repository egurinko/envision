// BASIC EXPRESS SETUPs

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const services = require("../db/index")();
const apiRouter = require("./api")(services);

const app = express();

// LOGGING SETTINGs
app.use(
  morgan(
    ":remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length] :response-time ms"
  )
);

// URL ENCODE & JSON PARSE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CROSS DOMAIN
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

// SEND TO APIs
app.use("/api", apiRouter);

// SERVE STATIC FILEs
app.use(express.static(path.join(__dirname, "/../dist/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../dist/index.html"));
});

module.exports = app;
