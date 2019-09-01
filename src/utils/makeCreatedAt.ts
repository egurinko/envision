import moment from "moment-timezone";

export default (unixtime: number): string => {
  const year = moment.tz(unixtime, "Asia/Tokyo").format("YYYY");
  const month = moment.tz(unixtime, "Asia/Tokyo").format("MM");
  const day = moment.tz(unixtime, "Asia/Tokyo").format("DD");
  return year + "/" + month + "/" + day;
};
