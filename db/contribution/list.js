const MongoClient = require("mongodb").MongoClient;
const config = require("../../config");
const parser = { useNewUrlParser: true, useUnifiedTopology: true };

const callDB = async (method, endpoint) => {
  const client = MongoClient(config.db.mongoURL, parser);
  try {
    await client.connect();
    const db = client.db(config.db.dbName);

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
    return await callDB("GET", "contribution").catch(err => {
      throw Error(err);
    });
  };
};
