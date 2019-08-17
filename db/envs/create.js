const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    try {
      for (let obj of data) {
        await callDB("POST", obj.type, { value: obj.value });
      }
    } catch (err) {
      throw Error(err);
    }
  };
};