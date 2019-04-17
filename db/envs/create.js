const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    for (let obj of data) {
      await callDB("POST", obj.type, { value: obj.value });
    }
  };
};
