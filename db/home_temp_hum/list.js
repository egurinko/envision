const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const data = await callDB("GET", "home_temp_hum");
    return data;
  };
};
