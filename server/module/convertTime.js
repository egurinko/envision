const moment = require("moment-timezone");

module.exports = unixtime => {
  const jpTime = moment.tz(unixtime, "Asia/Tokyo").format("M/D HH:mm:ss");
  return jpTime;
};
