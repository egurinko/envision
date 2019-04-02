const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    await callDB("POST", "envs", data);
  };
};
