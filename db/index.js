module.exports = function() {
  return {
    envs: require("./envs")(),
    comfort: require("./comfort")(),
    oldData: require("./oldData")(),
    trainingData: require("./trainingData")(),
    contribution: require("./contribution")(),
    user: require("./users")()
  };
};
