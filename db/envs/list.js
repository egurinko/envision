const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

module.exports = () => {
  return async () => {
    console.log("CONNECTED");
    const client = MongoClient(url);

    try {
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(dbName);

      let data = await db.collection("envs").find();

      client.close();
      return data;
    } catch (err) {
      console.log(err.stack);
    }
  };
};
