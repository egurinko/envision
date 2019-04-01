const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const assert = require("assert");

module.exports = () => {
  return async data => {
    const client = MongoClient(url);

    try {
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(dbName);

      let r = await db.collection("envs").insertOne(data);
      assert.equal(1, r.insertedCount);

      client.close();
    } catch (err) {
      console.log(err.stack);
    }
  };
};
