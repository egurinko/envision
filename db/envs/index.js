module.exports = config => {
  return {
    create: require("./create")(config),
    list: require("./list")(config)
  };
};
