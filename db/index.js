const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const config = {
  MongoClient,
  url,
  dbName
};

module.exports = function() {
  return {
    envs: require("./envs")(config),
    co2: require("./co2")(config)
  };
};
