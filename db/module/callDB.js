const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const domain = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const parser = { useNewUrlParser: true };

// TIMESTAMP
let date = new Date();
let a = date.getTime();

module.exports = async (method, endpoint, postData = null) => {
  const client = MongoClient(domain, parser);
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("Connected successfully to MONGODB");

    if (method === "POST") {
      postData.timestamp = a;
      await db.collection(endpoint).insertOne(postData);

      client.close();
      return;
    } else if (method === "GET") {
      const data = await db
        .collection(endpoint)
        .find({})
        .toArray();

      client.close();
      return data;
    }
  } catch (err) {
    console.log(err.stack);
  }
};
