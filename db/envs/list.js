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
    console.log("COLOR", colorTemp, "LUX", lux);
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
