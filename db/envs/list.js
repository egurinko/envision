const callDB = require("../module/callDB");

module.exports = () => {
  return async timespan => {
    const co2 = await callDB("GET", "co2", timespan);
    const colorTemp = await callDB("GET", "color_temp", timespan);
    const humidity = await callDB("GET", "hum", timespan);
    const lux = await callDB("GET", "lux", timespan);
    const pressure = await callDB("GET", "pressure", timespan);
    const temperature = await callDB("GET", "temp", timespan);
    const snack = await callDB("GET", "weight", timespan);
    return [
      { key: "co2", data: co2 },
      { key: "snack", data: snack },
      { key: "temperature", data: temperature },
      { key: "lux", data: lux },
      { key: "color temperature", data: colorTemp },
      { key: "humidity", data: humidity },
      { key: "pressure", data: pressure }
    ];
  };
};
