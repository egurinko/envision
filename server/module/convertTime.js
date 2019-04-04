const moment = require("moment-timezone");

module.exports = unixtime => {
  const jpTime = moment(unixtime * 1000)
    .tz("Asia/Tokyo")
    .format("YYYY-MMM-DD HH:mm:ss");
  return jpTime;
};
