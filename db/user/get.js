const callDB = require("../module/callDB");

module.exports = () => {
  return async data => {
    return await callDB("GET_ONE", "user", data)
      .then(res => res)
      .catch(err => {
        throw Error(err);
      });
  };
};
