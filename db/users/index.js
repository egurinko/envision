module.exports = () => {
  return {
    create: require("./create")(),
    list: require("./list")(),
    get: require("./get")()
  };
};
