const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url =
  "mongodb://heroku_f8d8pb52:iifc0c5c5pfna741g849b0ov75@ds143163.mlab.com:43163/heroku_f8d8pb52";

const dbName = "tryDB";

module.exports = function() {
  const client = MongoClient(url);

  client.connect(err => {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, () => {
      client.close();
    });
  });
};

const insertDocuments = (db, callback) => {
  const collection = db.collection("documents");

  const documents = [{ a: 1 }, { a: 2 }, { a: 3 }];
  // myDBデータベースのdocumentsコレクションに対して
  // ドキュメントを3つ追加します
  collection.insertMany(documents, (err, result) => {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};
