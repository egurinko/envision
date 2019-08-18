const callDB = require("../module/callDB");
const constant = require("../../constant");

module.exports = () => {
  return async () => {
    const temperature = await callDB("GET", "temp", "latest");
    const humididy = await callDB("GET", "hum", "latest");
    const pressure = await callDB("GET", "pressure", "latest");
    const lux = await callDB("GET", "lux", "latest");
    const colorTemperature = await callDB("GET", "color_temp", "latest");
    const snack = await callDB("GET", "weight", "latest");
    const co2 = await callDB("GET", "co2", "latest");

    console.log("CO!2222222", co2);

    const initialPoint = 1;

    let tempIndex = 1;
    if (temperature.length !== 0) {
      const maxGoodTemp = constant.TEMP_UPPER_LIMIT;
      const minGoodTemp = constant.TEMP_LOWER_LIMIT;
      const currentTemp = Number(temperature[0].value);
      tempIndex =
        currentTemp > maxGoodTemp
          ? initialPoint - (currentTemp - maxGoodTemp) / 18
          : currentTemp < minGoodTemp
          ? initialPoint - (minGoodTemp - currentTemp) / 18
          : initialPoint;
    }

    let humIndex = 1;
    if (humididy.length !== 0) {
      const maxGoodHum = constant.HUM_UPPER_LIMIT;
      const minGoodHum = constant.HUM_LOWER_LIMIT;
      const currentHum = Number(humididy[0].value);
      humIndex =
        currentHum > maxGoodHum
          ? initialPoint - (currentHum - maxGoodHum) / 28
          : currentHum < minGoodHum
          ? initialPoint - (minGoodHum - currentHum) / 28
          : initialPoint;
    }

    let pressureIndex = 1;
    if (pressure.length !== 0) {
      const maxGoodPressure = constant.PRESSURE_LOWER_LIMIT;
      const currentPressure = Number(pressure[0].value);
      pressureIndex =
        currentPressure < maxGoodPressure
          ? initialPoint - (maxGoodPressure - currentPressure) / 6
          : initialPoint;
    }

    let co2Index = 1;
    if (co2.length !== 0) {
      const maxGoodCo2 = constant.CO2_UPPER_LIMIT;
      const currentCo2 = Number(co2[0].value);
      co2Index =
        currentCo2 > maxGoodCo2
          ? initialPoint - (currentCo2 - maxGoodCo2) / 2800
          : initialPoint;
    }

    let luxIndex = 1;
    if (lux.length !== 0) {
      const maxGoodLux = constant.LUX_UPPER_LIMIT;
      const minGoodLux = constant.LUX_LOWER_LIMIT;
      const currentLux = Number(lux[0].value);
      luxIndex =
        currentLux > maxGoodLux
          ? initialPoint - (currentLux - maxGoodLux) / 1800
          : currentLux < minGoodLux
          ? initialPoint - (minGoodLux - currentLux) / 1800
          : initialPoint;
    }

    let snackIndex = 1;
    if (snack.length !== 0) {
      const minSnack = constant.SNACK_LOWER_LIMIT;
      const currentSnack = Number(snack[0].value);
      snackIndex =
        currentSnack < minSnack
          ? initialPoint - (minSnack - currentSnack) / 1500
          : initialPoint;
    }

    const data = {
      timestamp: co2[0].timestamp,
      comfortIndex:
        tempIndex * humIndex * pressureIndex * co2Index * luxIndex * snackIndex,
      detail: [
        { key: "snack", value: snackIndex },
        { key: "co2", value: co2Index },
        { key: "temperature", value: tempIndex },
        { key: "lux", value: luxIndex },
        { key: "humidity", value: humIndex },
        { key: "pressure", value: pressureIndex }
      ]
    };
    await callDB("POST", "comfort", data);

    return data;
  };
};
