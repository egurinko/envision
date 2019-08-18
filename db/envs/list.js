const callDB = require("../module/callDB");

module.exports = () => {
  return async timespan => {
    let co2, colorTemp, humidity, lux, pressure, temperature, snack;

    try {
      co2 = await callDB("GET", "co2", timespan);
      colorTemp = await callDB("GET", "color_temp", timespan);
      humidity = await callDB("GET", "hum", timespan);
      lux = await callDB("GET", "lux", timespan);
      pressure = await callDB("GET", "pressure", timespan);
      temperature = await callDB("GET", "temp", timespan);
      snack = await callDB("GET", "weight", timespan);

      return [
        { key: "co2", data: co2 },
        { key: "snack", data: snack },
        { key: "temperature", data: temperature },
        { key: "lux", data: lux },
        { key: "color temperature", data: colorTemp },
        { key: "humidity", data: humidity },
        { key: "pressure", data: pressure }
      ];
    } catch (err) {
      throw new Error(err);
    }
  };
};
