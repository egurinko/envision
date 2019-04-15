const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    await callDB("POST", "home_temp_hum", data);
  };
};
