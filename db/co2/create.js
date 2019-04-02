const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    await callDB("POST", "co2", data);
  };
};
