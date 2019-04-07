const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const data = await callDB("GET", "comfort");
    return data;
  };
};
