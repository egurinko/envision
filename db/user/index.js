module.exports = () => {
  return {
    create: require("./create")(),
    get: require("./get")()
  };
};
