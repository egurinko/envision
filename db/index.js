module.exports = function() {
  return {
    envs: require("./envs")(),
    comfort: require("./comfort")(),
    homeTempHum: require("./home_temp_hum")(),
    oldData: require("./old_data")()
  };
};
