const moment = require("moment-timezone");

module.exports = unixtime => {
  const jpTime = moment
    .tz(unixtime, "Asia/Tokyo")
    .format("YYYY-MMM-DD HH:mm:ss");
  console.log(unixtime, jpTime);
  return jpTime;
};
