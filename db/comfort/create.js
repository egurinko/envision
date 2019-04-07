const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const envData = await callDB("GET", "envs", "latest");
    const co2Data = await callDB("GET", "co2", "latest");

    const initialPoint = 25;

    const maxGoodTemp = 24;
    const minGoodTemp = 22;
    const currentTemp = Number(envData[0].temp.value);
    const tempIndex =
      currentTemp > maxGoodTemp
        ? initialPoint - (currentTemp - maxGoodTemp) * 2
        : currentTemp < minGoodTemp
        ? initialPoint - (minGoodTemp - currentTemp) * 2
        : initialPoint;

    const maxGoodHum = 60;
    const minGoodHum = 40;
    const currentHum = Number(envData[0].hum.value);
    const humIndex =
      currentHum > maxGoodHum
        ? initialPoint - (currentHum - maxGoodHum)
        : currentHum < minGoodHum
        ? initialPoint - (minGoodHum - currentHum)
        : initialPoint;

    const maxGoodPressure = 990;
    const currentPressure = Number(envData[0].pressure.value);
    const pressureIndex =
      currentPressure < maxGoodPressure
        ? initialPoint - (maxGoodPressure - currentPressure) / 10
        : initialPoint;

    const maxGoodCo2 = 700;
    const currentCo2 = Number(co2Data[0].co2.value);
    const co2Index =
      currentCo2 > maxGoodCo2
        ? initialPoint - (currentCo2 - maxGoodCo2) / 50
        : initialPoint;

    const data = {
      timestamp: co2Data[0].timestamp,
      comfortIndex: tempIndex + humIndex + pressureIndex + co2Index,
      detail: {
        tempIndex,
        humIndex,
        pressureIndex,
        co2Index
      }
    };
    await callDB("POST", "comfort", data);

    return data;
  };
};
