const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url =
  "mongodb://heroku_f8d8pb52:iifc0c5c5pfna741g849b0ov75@ds143163.mlab.com:43163/heroku_f8d8pb52";

module.exports = function() {
  MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully to server");
    insertDocuments(db, () => {
      db.close();
    });
  });
};

const insertDocuments = (db, callback) => {
  const documents = [{ a: 1 }, { a: 2 }, { a: 3 }];
  // myDBデータベースのdocumentsコレクションに対して
  // ドキュメントを3つ追加します
  db.collection("documents").insertMany(documents, (err, result) => {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};
