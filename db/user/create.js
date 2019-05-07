const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    return await callDB("POST", "user", data)
      .then(res => res)
      .catch(err => {
        throw Error(err);
      });
  };
};
