const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = process.env.MONGO_URL;

module.exports = function() {
  const client = MongoClient(url);

  return {
    envs: require("./envs")(client)
  };
};
