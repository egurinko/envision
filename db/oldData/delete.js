const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const collections = await callDB("GET_KEYS");

    let keys = collections.map(colloction => colloction.name);
    keys = keys.filter(key => {
      return (
        key !== "system.indexes" &&
        key !== "objectlabs-system.admin.collections" &&
        key !== "objectlabs-system"
      );
    });

    for (let key of keys) {
      await callDB("DELETE", key);
    }
    return keys;
  };
};
