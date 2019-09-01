import moment from "moment-timezone";
import store from "../store/index";

export default (unixtime: string): string=> {
  const month = moment.tz(unixtime, "Asia/Tokyo").format("MM");
  const day = moment.tz(unixtime, "Asia/Tokyo").format("DD");
  const hour = moment.tz(unixtime, "Asia/Tokyo").format("HH");
  const minute = moment.tz(unixtime, "Asia/Tokyo").format("mm");

  return store.getters["ui/getSelectedTimespan"] !== "WEEK"
    ? hour + ":" + minute
    : month + "/" + day + " " + hour + ":" + minute;
};
