module.exports = config => {
  return {
    create: require("./create")(config)
  };
};
