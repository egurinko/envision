const moment = require("moment-timezone");

module.exports = unixtime => {
  // const year = moment.tz(unixtime, "Asia/Tokyo").format("YYYY");
  // const month = moment.tz(unixtime, "Asia/Tokyo").format("MM");
  // const day = moment.tz(unixtime, "Asia/Tokyo").format("DD");
  const hour = moment.tz(unixtime, "Asia/Tokyo").format("HH");
  const minute = moment.tz(unixtime, "Asia/Tokyo").format("mm");

  return hour + ":" + minute;
  // const jpTime = moment.tz(unixtime, "Asia/Tokyo").format("M/D HH:mm:ss");
  // return minute[1] !== "0" && minute[1] !== "5"
  //   ? ""
  //   : minute !== "00"
  //   ? minute
  //   : hour !== "00"
  //   ? hour + ":" + minute
  //   : month !== "01"
  //   ? month + "/" + day + " "
  //   : year + "/" + month + "/" + day + " ";
};
