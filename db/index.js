module.exports = function() {
  return {
    envs: require("./envs")(),
    co2: require("./co2")(),
    comfort: require("./comfort")()
  };
};
