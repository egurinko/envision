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
    console.log("Connected successfully to MONGODB " + endpoint + " TABLE");

    if (method === "POST") {
      options.timestamp = a;
      await db.collection(endpoint).insertOne(options);

      client.close();
      return;
    } else if (method === "GET") {
      let data;
      if (options === "latest") {
        data = await db
          .collection(endpoint)
          .find()
          .limit(1)
          .sort({ $natural: -1 })
          .toArray();

        client.close();
      } else {
        if (options === null) options = 1;
        const timespan = a - 3600000 * options;
        data = await db
          .collection(endpoint)
          .find({ timestamp: { $gt: timespan } })
          .toArray();

        data = data.filter((value, index) => {
          return index % options === 0;
        });

        client.close();
      }

      return data;
    } else if (method === "GET_KEYS") {
      const keys = await db.listCollections().toArray();

      client.close();
      return keys;
    } else if (method === "DELETE") {
      const timespan = a - 3600000 * 24 * 10;
      await db
        .collection(endpoint)
        .deleteMany({ timestamp: { $lt: timespan } });

      client.close();
      return;
    }
  } catch (err) {
    throw Error(err);
  }
};
