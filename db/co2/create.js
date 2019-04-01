module.exports = config => {
  return async data => {
    const client = config.MongoClient(config.url);

    try {
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(config.dbName);

      await db.collection("co2").insertOne(data);

      client.close();
    } catch (err) {
      console.log(err.stack);
    }
  };
};
