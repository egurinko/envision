module.exports = config => {
  return async () => {
    const client = config.MongoClient(config.url);

    try {
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(config.dbName);

      let data = await db.collection("envs").find();

      client.close();
      return data;
    } catch (err) {
      console.log(err.stack);
    }
  };
};
