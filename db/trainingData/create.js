const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    await callDB("POST", "training_data", data);
  };
};
