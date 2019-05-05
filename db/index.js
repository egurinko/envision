module.exports = function() {
  return {
    envs: require("./envs")(),
    comfort: require("./comfort")(),
    oldData: require("./old_data")()
  };
};
