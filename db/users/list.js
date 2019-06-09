const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const domain = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const parser = { useNewUrlParser: true };

const callDB = async (method, endpoint) => {
  const client = MongoClient(domain, parser);
  try {
    await client.connect();
    const db = client.db(dbName);

    const data = await db
      .collection(endpoint)
      .find({})
      .toArray();

    client.close();

    return data;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = () => {
  return async () => {
    return await callDB("GET", "user").catch(err => {
      throw Error(err);
    });
  };
};
