const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const temperature = await callDB("GET", "temp", "latest");
    const humididy = await callDB("GET", "hum", "latest");
    const pressure = await callDB("GET", "pressure", "latest");
    const lux = await callDB("GET", "lux", "latest");
    const colorTemperature = await callDB("GET", "color_temp", "latest");
    const snack = await callDB("GET", "weight", "latest");
    const co2 = await callDB("GET", "co2", "latest");

    const initialPoint = 1;

    let tempIndex = 1;
    if (temperature.length !== 0) {
      const maxGoodTemp = 24;
      const minGoodTemp = 22;
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
      const maxGoodHum = 60;
      const minGoodHum = 40;
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
      const maxGoodPressure = 1000;
      const currentPressure = Number(pressure[0].value);
      pressureIndex =
        currentPressure < maxGoodPressure
          ? initialPoint - (maxGoodPressure - currentPressure) / 6
          : initialPoint;
    }

    let co2Index = 1;
    if (co2.length !== 0) {
      const maxGoodCo2 = 700;
      const currentCo2 = Number(co2[0].value);
      co2Index =
        currentCo2 > maxGoodCo2
          ? initialPoint - (currentCo2 - maxGoodCo2) / 2800
          : initialPoint;
    }

    let luxIndex = 1;
    if (lux.length !== 0) {
      const maxGoodLux = 1800;
      const minGoodLux = 1300;
      const currentLux = Number(lux[0].value);
      luxIndex =
        currentLux > maxGoodLux
          ? initialPoint - (currentLux - maxGoodLux) / 2300
          : currentLux < minGoodLux
          ? initialPoint - (minGoodLux - currentLux) / 2300
          : initialPoint;
    }

    let snackIndex = 1;
    if (snack.length !== 0) {
      const minSnack = 1000;
      const currentSnack = Number(snack[0].value);
      snackIndex =
        currentSnack < minSnack
          ? initialPoint - (minSnack - currentSnack) / 2000
          : initialPoint;
    }

    const data = {
      timestamp: co2[0].timestamp,
      comfortIndex:
        tempIndex * humIndex * pressureIndex * co2Index * luxIndex * snackIndex,
      detail: [
        { key: "temperature", value: tempIndex },
        { key: "co2", value: co2Index },
        { key: "lux", value: luxIndex },
        { key: "humidity", value: humIndex },
        { key: "pressure", value: pressureIndex },
        { key: "snack", value: snackIndex }
      ]
    };
    await callDB("POST", "comfort", data);

    return data;
  };
};
