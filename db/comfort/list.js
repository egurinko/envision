const callDB = require("../module/callDB");

module.exports = () => {
  return async timespan => {
    const data = await callDB("GET", "comfort", timespan).catch(err => {
      throw Error(err);
    });
    return data;
  };
};
