const callDB = require("../module/callDB");

module.exports = () => {
  return async timespan => {
    return await callDB("GET", "training_data", timespan).catch(err => {
      throw Error(err);
    });
  };
};
