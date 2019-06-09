const callDB = require("../module/callDB");

module.exports = () => {
  return async timespan => {
    return await callDB("GET", "contribution", timespan).catch(err => {
      throw Error(err);
    });
  };
};
