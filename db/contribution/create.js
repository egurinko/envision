const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    await callDB("POST", "contribution", data).catch(err => {
      return Promise.reject(err);
    });
  };
};
