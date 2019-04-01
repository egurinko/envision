require("dotenv").config();
const dbName = process.env.DB_NAME;

const assert = require("assert");

module.exports = client => {
  return async data => {
    try {
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(dbName);

      let r = await db.collection("envs").insertOne(data);
      assert.equal(1, r.insertedCount);

      console.log("Inserted DATA", data);
      console.log("RESULT", r);

      client.close();
    } catch (err) {
      console.log(err.stack);
    }
  };
};
