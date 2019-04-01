module.exports = client => {
  return {
    create: require("./create")(client)
  };
};
