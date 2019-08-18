const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const collections = await callDB("GET_KEYS").catch(err => {
      return Promise.reject(err);
    });

    let keys = collections.map(colloction => colloction.name);
    keys = keys.filter(key => {
      return (
        key !== "system.indexes" &&
        key !== "objectlabs-system.admin.collections" &&
        key !== "objectlabs-system" &&
        key !== "user"
      );
    });

    try {
      for (let key of keys) {
        await callDB("DELETE", key);
      }
      return keys;
    } catch (err) {
      next(err);
    }
  };
};
