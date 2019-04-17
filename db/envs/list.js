const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const co2 = await callDB("GET", "co2");
    const colorTemp = await callDB("GET", "color_temp");
    const humidity = await callDB("GET", "hum");
    const lux = await callDB("GET", "lux");
    const pressure = await callDB("GET", "pressure");
    const temperature = await callDB("GET", "temp");
    const snack = await callDB("GET", "weight");
    return [
      { key: "co2", data: co2 },
      { key: "color temperature", data: colorTemp },
      { key: "humidity", data: humidity },
      { key: "lux", data: lux },
      { key: "pressure", data: pressure },
      { key: "temperature", data: temperature },
      { key: "snack", data: snack }
    ];
  };
};
