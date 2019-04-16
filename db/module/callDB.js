const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const domain = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const parser = { useNewUrlParser: true };

module.exports = async (method, endpoint, options = null) => {
  const client = MongoClient(domain, parser);

  // TIMESTAMP
  const date = new Date();
  const a = date.getTime();
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("Connected successfully to MONGODB");

    if (method === "POST") {
      options.timestamp = a;
      let counter = 0;
      for (let key in options) {
        counter++;
      }
      if (counter > 1) {
        await db.collection(endpoint).insertOne(options);
      }

      client.close();
      return;
    } else if (method === "GET") {
      let data;
      if (options === null) {
        const oneHourAgo = a - 3600000;
        data = await db
          .collection(endpoint)
          .find({ timestamp: { $gt: oneHourAgo } })
          .toArray();

        client.close();
      } else if (options === "latest") {
        data = await db
          .collection(endpoint)
          .find()
          .limit(1)
          .sort({ $natural: -1 })
          .toArray();

        client.close();
      }

      return data;
    }
  } catch (err) {
    console.log(err.stack);
  }
};
