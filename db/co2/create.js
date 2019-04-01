require("dotenv").config();
const dbName = process.env.DB_NAME;

module.exports = client => {
  return data => {
    client.connect(err => {
      console.log("Connected successfully to server");
      const db = client.db(dbName);

      insertDocuments(db, data, () => {
        client.close();
      });
    });
  };
};

const insertDocuments = (db, data, callback) => {
  const collection = db.collection("co2");

  collection.insert(data, (err, result) => {
    console.log("Inserted DATA", data);
    console.log("RESULT", result);
    callback(result);
  });
};
