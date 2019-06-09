const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    return await callDB("GET", "contribution").catch(err => {
      throw Error(err);
    });
  };
};
