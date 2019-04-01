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
  // Dateオブジェクトを作成
  let date = new Date();

  // UNIXタイムスタンプを取得する (ミリ秒単位)
  let a = date.getTime();

  // UNIXタイムスタンプを取得する (秒単位 - PHPのtime()と同じ)
  let b = Math.floor(a / 1000);
  data.timestamp = b;

  collection.insertOne(data, (err, result) => {
    console.log("Inserted DATA", data);
    console.log("RESULT", result);
    callback(result);
  });
};
