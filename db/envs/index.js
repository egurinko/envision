require("dotenv").config();
const dbName = process.env.DB_NAME;

module.exports = client => {
  return data => {
    client.connect(err => {
      console.log("Connected successfully to server", data);
      const db = client.db(dbName);

      insertDocuments(db, data, () => {
        client.close();
      });
    });
  };
};

const insertDocuments = (db, data, callback) => {
  const collection = db.collection("documents");

  // myDBデータベースのdocumentsコレクションに対して
  // ドキュメントを3つ追加します
  collection.insertMany(data, (err, result) => {
    console.log("Inserted 3 documents into the collection", data, result);
    callback(result);
  });
};
