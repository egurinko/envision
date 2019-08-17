
require("dotenv").config();
const domain = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const apiSecret = process.env.API_SECRET;

const env = process.env.NODE_ENV;

module.exports = env === "development" ? {
    db: {
        dbName: "envision",
        mongoURI: "mongodb://127.0.0.1:27017",
        mongoURL: "mongodb://127.0.0.1:27017",
    },
    express: {
      port: 4000,
      apiSecret: "apiSecret"
    }
  } : {
    db: {
        dbName: dbName,
        mongoURI: domain,
        mongoURL: domain,
    },
    express: {
        port: 3000,
        apiSecret: apiSecret
    }
};